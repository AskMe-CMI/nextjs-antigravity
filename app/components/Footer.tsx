const Footer = () => {
    return (
        <footer className="w-full py-12 px-6 md:px-12 bg-[var(--background)] border-t border-[var(--border)] mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <h3 className="font-serif text-xl font-bold mb-2">Me Do List</h3>
                    <p className="text-[var(--muted)] text-sm">Organize your life, one task at a time.</p>
                </div>

                <div className="flex gap-8 text-sm text-[var(--muted)]">
                    <a href="#" className="hover:text-[var(--foreground)] transition-colors">Privacy</a>
                    <a href="#" className="hover:text-[var(--foreground)] transition-colors">Terms</a>
                    <a href="#" className="hover:text-[var(--foreground)] transition-colors">Contact</a>
                </div>

                <div className="text-sm text-[var(--muted)]">
                    &copy; {new Date().getFullYear()} Me Do List.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
