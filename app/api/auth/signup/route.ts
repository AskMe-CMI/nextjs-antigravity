import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { RowDataPacket } from 'mysql2';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
    region: 'us-east-1', // Minio requires a region, us-east-1 is standard default
    endpoint: process.env.MINIO_ENDPOINT || 'http://localhost:9000',
    credentials: {
        accessKeyId: process.env.MINIO_ROOT_USER || 'admin',
        secretAccessKey: process.env.MINIO_ROOT_PASSWORD || 'supersecretminio',
    },
    forcePathStyle: true, // Required for Minio
});

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const profilePicture = formData.get('profilePicture') as File | null;

        if (!name || !email || !password) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        // Check if user already exists
        const [existingUsers] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email]);

        if (existingUsers.length > 0) {
            return NextResponse.json({ message: 'User already exists' }, { status: 409 });
        }

        let profilePictureUrl = null;

        if (profilePicture && profilePicture.size > 0) {
            const buffer = Buffer.from(await profilePicture.arrayBuffer());
            const fileName = `${Date.now()}-${profilePicture.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
            const bucketName = process.env.MINIO_BUCKET_NAME || 'medolist-profiles';

            const command = new PutObjectCommand({
                Bucket: bucketName,
                Key: fileName,
                Body: buffer,
                ContentType: profilePicture.type,
            });

            await s3.send(command);
            
            // Build the public URL (Note: In production, you might want an external URL here instead of internal endpoint if they differ)
            profilePictureUrl = `${process.env.MINIO_ENDPOINT || 'http://localhost:9000'}/${bucketName}/${fileName}`;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Fallback: If the profile_picture column doesn't exist (because user didn't recreate DB), this will fail.
        // We catch it and alert them in the logs, but it's expected they run docker-compose down -v.
        
        await pool.query(
            'INSERT INTO users (name, email, password, profile_picture) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, profilePictureUrl]
        );

        return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
