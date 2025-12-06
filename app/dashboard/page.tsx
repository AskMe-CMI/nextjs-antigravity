/* eslint-disable */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import Link from "next/link";

interface Task {
    id: number;
    text: string;
    completed: number | boolean;
    category: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

export default function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState("");
    const [category, setCategory] = useState("Personal");
    const [filter, setFilter] = useState("All");
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            router.push('/signin');
            return;
        }
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        fetchTasks(parsedUser.id);
    }, []);

    const fetchTasks = async (userId: number) => {
        try {
            const res = await fetch(`/api/tasks?userId=${userId}`);
            if (res.ok) {
                const data = await res.json();
                // Ensure completed is boolean
                const formattedTasks = data.map((t: { id: number; text: string; completed: number | boolean; category: string }) => ({
                    ...t,
                    completed: Boolean(t.completed)
                }));
                setTasks(formattedTasks);
            }
        } catch (error) {
            console.error("Failed to fetch tasks", error);
        }
    };

    const addTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.trim() || !user) return;

        try {
            const res = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, text: newTask, category }),
            });

            if (res.ok) {
                const task = await res.json();
                setTasks([task, ...tasks]);
                setNewTask("");
            }
        } catch (error) {
            console.error("Failed to add task", error);
        }
    };

    const toggleTask = async (id: number) => {
        const task = tasks.find(t => t.id === id);
        if (!task) return;

        try {
            await fetch('/api/tasks', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, completed: !task.completed }),
            });

            setTasks(tasks.map(t =>
                t.id === id ? { ...t, completed: !t.completed } : t
            ));
        } catch (error) {
            console.error("Failed to update task", error);
        }
    };

    const deleteTask = async (id: number) => {
        try {
            await fetch(`/api/tasks?id=${id}`, { method: 'DELETE' });
            setTasks(tasks.filter(t => t.id !== id));
        } catch (error) {
            console.error("Failed to delete task", error);
        }
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === "All") return true;
        return task.category === filter;
    });

    return (
        <div className="min-h-screen flex bg-[var(--background)]">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-[var(--border)] p-6 hidden md:block relative">
                <div className="mb-8">
                    <Link href="/" className="text-2xl font-serif font-bold tracking-tight">
                        Me Do List
                    </Link>
                </div>

                <nav className="space-y-2">
                    <button
                        onClick={() => setFilter("All")}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${filter === "All" ? "bg-[var(--secondary)] font-medium" : "hover:bg-[var(--secondary)]"}`}
                    >
                        All Tasks
                    </button>
                    <button
                        onClick={() => setFilter("Personal")}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${filter === "Personal" ? "bg-[var(--secondary)] font-medium" : "hover:bg-[var(--secondary)]"}`}
                    >
                        Personal
                    </button>
                    <button
                        onClick={() => setFilter("Work")}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${filter === "Work" ? "bg-[var(--secondary)] font-medium" : "hover:bg-[var(--secondary)]"}`}
                    >
                        Work
                    </button>
                    <button
                        onClick={() => setFilter("Health")}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${filter === "Health" ? "bg-[var(--secondary)] font-medium" : "hover:bg-[var(--secondary)]"}`}
                    >
                        Health
                    </button>
                </nav>

                <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                            <p className="font-medium text-sm">{user?.name || 'User'}</p>
                            <p className="text-xs text-[var(--muted)]">{user?.email || ''}</p>
                        </div>
                    </div>
                    <Link href="/signin" onClick={() => localStorage.removeItem('user')}>
                        <Button variant="outline" className="w-full text-sm">Sign Out</Button>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-serif font-bold text-[var(--foreground)]">
                        {filter} Tasks
                    </h1>
                    <div className="md:hidden">
                        {/* Mobile menu toggle would go here */}
                    </div>
                </header>

                {/* Add Task Form */}
                <form onSubmit={addTask} className="mb-8 bg-white p-4 rounded-xl shadow-sm border border-[var(--border)] flex gap-4">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="What needs to be done?"
                        className="flex-1 bg-transparent focus:outline-none text-[var(--foreground)] placeholder-[var(--muted)]"
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="bg-transparent focus:outline-none text-sm text-[var(--muted)]"
                    >
                        <option value="Personal">Personal</option>
                        <option value="Work">Work</option>
                        <option value="Health">Health</option>
                    </select>
                    <Button type="submit" size="sm">Add</Button>
                </form>

                {/* Task List */}
                <div className="space-y-3">
                    {filteredTasks.map(task => (
                        <div
                            key={task.id}
                            className={`group flex items-center gap-4 p-4 bg-white rounded-xl border transition-all ${task.completed ? "border-[var(--border)] opacity-60" : "border-[var(--border)] hover:border-[var(--primary)] hover:shadow-md"}`}
                        >
                            <button
                                onClick={() => toggleTask(task.id)}
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${task.completed ? "bg-[var(--primary)] border-[var(--primary)]" : "border-[var(--muted)] hover:border-[var(--primary)]"}`}
                            >
                                {task.completed && <span className="text-white text-xs">✓</span>}
                            </button>

                            <span className={`flex-1 ${task.completed ? "line-through text-[var(--muted)]" : ""}`}>
                                {task.text}
                            </span>

                            <span className="text-xs px-2 py-1 rounded-full bg-[var(--secondary)] text-[var(--foreground)]">
                                {task.category}
                            </span>

                            <button
                                onClick={() => deleteTask(task.id)}
                                className="opacity-0 group-hover:opacity-100 text-[var(--muted)] hover:text-red-500 transition-opacity"
                            >
                                Delete
                            </button>
                        </div>
                    ))}

                    {filteredTasks.length === 0 && (
                        <div className="text-center py-12 text-[var(--muted)]">
                            <p>No tasks found. Start by adding one!</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
