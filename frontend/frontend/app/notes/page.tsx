"use client";

import React, { useState } from 'react';
import BackButton from '@/components/BackButton';

const NOTES_CONFIG = {

    TITLE: "Notlarım",
    SUBTITLE_PREFIX: "Toplam",
    SUBTITLE_SUFFIX: "notun var.",
    EMPTY_STATE: "Henüz hiç not eklememişsin.",
    ADD_BUTTON: "Yeni Not Oluştur",
    SEARCH_PLACEHOLDER: "Notlarında ara...",
    DATE_PREFIX: "Oluşturulma:",
    MODAL: {
        TITLE_LABEL: "Başlık",
        CONTENT_LABEL: "Notun",
        SAVE: "Kaydet",
        CANCEL: "Vazgeç"
    }
};

const NotesPage = () => {

    const [notes] = useState([
        { id: 1, title: "Market Listesi", content: "Süt, yumurta, ekmek almayı unutma.", date: "12.10.2023", color: "blue" },
        { id: 2, title: "React Çalışma Notları", content: "useEffect cleanup fonksiyonu neden önemli?", date: "15.10.2023", color: "indigo" },
        { id: 3, title: "Film Önerileri", content: "Inception, Interstellar, Tenet. Nolan maratonu yapılacak.", date: "18.10.2023", color: "slate" },
    ]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 p-6">
            <div className="max-w-7xl mx-auto">

                {/* BACK BUTTON */}
                <BackButton />

                {/* ÜST KISIM: BAŞLIK VE AKSİYONLAR */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            {NOTES_CONFIG.TITLE}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                            {NOTES_CONFIG.SUBTITLE_PREFIX} {notes.length} {NOTES_CONFIG.SUBTITLE_SUFFIX}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative flex-1 md:w-64">
                            <input
                                type="text"
                                placeholder={NOTES_CONFIG.SEARCH_PLACEHOLDER}
                                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                            />
                            <span className="absolute left-3 top-2.5 opacity-40">🔍</span>
                        </div>

                        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/30 transition-all active:scale-95">
                            <span>+</span> {NOTES_CONFIG.ADD_BUTTON}
                        </button>
                    </div>
                </div>

                {/* NOTLAR GRİDİ */}
                {notes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {notes.map((note) => (
                            <div
                                key={note.id}
                                className="group relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-bl-full -z-0 group-hover:bg-blue-500/10 transition-colors" />

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {note.title}
                                        </h3>
                                        <button className="text-slate-400 hover:text-red-500 transition-colors">
                                            🗑️
                                        </button>
                                    </div>

                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-4">
                                        {note.content}
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/50">
                                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                            {note.date}
                                        </span>
                                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-xs font-bold text-blue-600">
                                            Düzenle
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="text-6xl mb-4 opacity-20">📝</div>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">
                            {NOTES_CONFIG.EMPTY_STATE}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotesPage;