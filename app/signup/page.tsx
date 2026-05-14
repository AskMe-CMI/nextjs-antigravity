"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import Link from "next/link";
import Image from "next/image";

export default function SignUp() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfilePicture(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("password", formData.password);
            if (profilePicture) {
                data.append("profilePicture", profilePicture);
            }

            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                body: data, // fetch automatically sets multipart/form-data with boundary
            });

            if (res.ok) {
                router.push('/signin');
            } else {
                const result = await res.json();
                setError(result.message || 'Something went wrong');
            }
        } catch {
            setError('Failed to create account');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-6">
            <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-[var(--border)]">
                <div className="text-center mb-8">
                    <Link href="/" className="text-2xl font-serif font-bold tracking-tight block mb-2">
                        Me Do List
                    </Link>
                    <h1 className="text-2xl font-bold">Create an account</h1>
                    <p className="text-[var(--muted)] text-sm">Start organizing your life today.</p>
                </div>

                {error && <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg text-sm text-center border border-red-200">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col items-center justify-center mb-6">
                        <label htmlFor="profilePicture" className="cursor-pointer group relative">
                            <div className="w-24 h-24 rounded-full border-2 border-dashed border-[var(--border)] flex items-center justify-center overflow-hidden bg-gray-50 group-hover:border-[var(--primary)] transition-colors">
                                {previewUrl ? (
                                    <Image src={previewUrl} alt="Preview" width={96} height={96} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-gray-400 text-center">
                                        <svg className="mx-auto h-8 w-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="text-xs">Upload</span>
                                    </div>
                                )}
                            </div>
                        </label>
                        <input
                            type="file"
                            id="profilePicture"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <p className="text-xs text-gray-500 mt-2">Optional: Choose a profile picture</p>
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            placeholder="Create a password"
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Creating account...' : 'Sign Up'}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <span className="text-[var(--muted)]">Already have an account? </span>
                    <Link href="/signin" className="text-[var(--primary)] font-medium hover:underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}
