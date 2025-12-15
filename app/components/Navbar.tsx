import Link from 'next/link';
import Button from './Button';

const Navbar = () => {
    return (
        <nav className="w-full py-6 px-6 md:px-12 flex items-center justify-between bg-[var(--background)] sticky top-0 z-50">
            <Link href="/" className="text-2xl font-serif font-bold tracking-tight">
                Me Do List
            </Link>

            <div className="flex items-center gap-4">
                <Link href="/signin" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">
                    Sign In
                </Link>
                <Link href="/signup">
                    <Button size="sm">Sign Up</Button>
                </Link>
                <Link href="/process-sheet">
                    <Button size="sm">Process Sheet</Button>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
