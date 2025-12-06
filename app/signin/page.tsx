"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import Link from "next/link";

export default function SignIn() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('user', JSON.stringify(data.user));
                router.push('/dashboard');
            } else {
                const data = await res.json();
                setError(data.message || 'Invalid credentials');
            }
        } catch {
            setError('Failed to sign in');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-6">
            <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-[var(--border)]">
                <div className="text-center mb-8">
                    <Link href="/" className="text-2xl font-serif font-bold tracking-tight block mb-2">
                        Me Do List
                    </Link>
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-[var(--muted)] text-sm">Please enter your details to sign in.</p>
                </div>

                {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
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
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]" />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="text-[var(--primary)] hover:underline">Forgot password?</a>
                    </div>

                    <Button type="submit" className="w-full">Sign In</Button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <span className="text-[var(--muted)]">Don&apos;t have an account? </span>
                    <Link href="/signup" className="text-[var(--primary)] font-medium hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
