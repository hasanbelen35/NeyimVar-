import { ReactNode } from 'react';

export default function HomeLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">

            {/* Navbar */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

                    {/* Logo */}
                    <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
                        NoteApp
                    </span>

                    {/* Sağ taraf */}
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500" />
                    </div>
                </div>
            </header>

            {/* İçerik */}
            <main className="max-w-6xl mx-auto px-4 py-8">
                <leftNav />
                {children}
            </main>

        </div>
    );
}