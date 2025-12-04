"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import Link from "next/link";

export default function SignUp() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push('/signin');
            } else {
                const data = await res.json();
                setError(data.message || 'Something went wrong');
            }
        } catch (err) {
            setError('Failed to sign up');
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

                {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
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

                    <Button type="submit" className="w-full">Sign Up</Button>
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
