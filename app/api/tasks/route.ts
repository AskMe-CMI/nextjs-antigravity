import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ message: 'Missing userId' }, { status: 400 });
        }

        const [tasks] = await pool.query<RowDataPacket[]>('SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC', [userId]);
        return NextResponse.json(tasks);
    } catch (error) {
        console.error('Fetch tasks error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { userId, text, category } = await request.json();

        if (!userId || !text) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO tasks (user_id, text, category) VALUES (?, ?, ?)',
            [userId, text, category || 'Personal']
        );

        const newTask = {
            id: result.insertId,
            user_id: userId,
            text,
            completed: false,
            category: category || 'Personal',
            created_at: new Date()
        };

        return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
        console.error('Create task error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { id, completed } = await request.json();

        if (!id) {
            return NextResponse.json({ message: 'Missing task id' }, { status: 400 });
        }

        await pool.query('UPDATE tasks SET completed = ? WHERE id = ?', [completed, id]);
        return NextResponse.json({ message: 'Task updated' });
    } catch (error) {
        console.error('Update task error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: 'Missing task id' }, { status: 400 });
        }

        await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
        return NextResponse.json({ message: 'Task deleted' });
    } catch (error) {
        console.error('Delete task error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
