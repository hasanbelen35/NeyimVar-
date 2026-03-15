"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchNotes, deleteNote, updateNote } from '@/store/noteSlice';
import BackButton from '@/components/BackButton';
import { useRouter } from 'next/navigation';

const NOTES_CONFIG = {
    TITLE: "Notlarım",
    SUBTITLE_PREFIX: "Toplam",
    SUBTITLE_SUFFIX: "notun var.",
    EMPTY_STATE: "Henüz hiç not eklememişsin.",
    ADD_BUTTON: "Yeni Not Oluştur",
    SEARCH_PLACEHOLDER: "Notlarında ara...",
    MODAL: {
        TITLE: "Notu Sil",
        DESCRIPTION: "Bu notu silmek istediğinize emin misiniz? Bu işlem geri alınamaz.",
        CONFIRM: "Sil",
        CANCEL: "Vazgeç"
    }
};

const NotesPage = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const { notes, loading } = useSelector((state: RootState) => state.notes);
    const [searchTerm, setSearchTerm] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

    const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({ title: '', content: '' });

    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch]);

    // UPDATE NOTE
    const handleUpdateNote = async (id: string) => {
        await dispatch(updateNote({ id, data: editForm })).unwrap();
        setEditingNoteId(null);
    };
    // delete note
    const openDeleteModal = (id: string) => {
        setSelectedNoteId(id);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        if (selectedNoteId) {
            await dispatch(deleteNote(selectedNoteId)).unwrap();
            setIsModalOpen(false);
            setSelectedNoteId(null);
        }
    };
    // filter notes based on search term
    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 p-6">

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    />

                    <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl max-w-sm w-full border border-slate-200 dark:border-slate-700 transform transition-all scale-100 animate-in fade-in zoom-in duration-200">
                        <div className="text-center space-y-4">
                            <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-3xl">
                                🗑️
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                {NOTES_CONFIG.MODAL.TITLE}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                {NOTES_CONFIG.MODAL.DESCRIPTION}
                            </p>
                        </div>

                        <div className="flex gap-3 mt-8">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 px-4 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                            >
                                {NOTES_CONFIG.MODAL.CANCEL}
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="flex-1 px-4 py-3 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30 transition-all active:scale-95"
                            >
                                {NOTES_CONFIG.MODAL.CONFIRM}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className={`max-w-7xl mx-auto transition-all ${isModalOpen ? 'blur-sm scale-[0.98]' : ''}`}>
                <BackButton />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            {NOTES_CONFIG.TITLE}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                            {loading ? "Yükleniyor..." : `${NOTES_CONFIG.SUBTITLE_PREFIX} ${notes.length} ${NOTES_CONFIG.SUBTITLE_SUFFIX}`}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative flex-1 md:w-64">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder={NOTES_CONFIG.SEARCH_PLACEHOLDER}
                                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                            />
                            <span className="absolute left-3 top-2.5 opacity-40">🔍</span>
                        </div>

                        <button
                            onClick={() => router.push('/add-new-note')}
                            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/30 transition-all active:scale-95"
                        >
                            <span>+</span> {NOTES_CONFIG.ADD_BUTTON}
                        </button>
                    </div>
                </div>

                {filteredNotes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredNotes.map((note) => (
                            <div
                                key={note.id}
                                className="group relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-bl-full -z-0 group-hover:bg-blue-500/10 transition-colors" />

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        {editingNoteId === String(note.id) ? (
                                            <input
                                                value={editForm.title}
                                                onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                                                className="text-lg font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700 rounded-lg px-2 py-1 w-full outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        ) : (
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {note.title}
                                            </h3>
                                        )}
                                        <button
                                            onClick={() => openDeleteModal(String(note.id))}
                                            className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all ml-2 shrink-0"
                                        >
                                            🗑️
                                        </button>
                                    </div>

                                    {editingNoteId === String(note.id) ? (
                                        <textarea
                                            value={editForm.content}
                                            onChange={(e) => setEditForm(prev => ({ ...prev, content: e.target.value }))}
                                            rows={4}
                                            className="w-full text-slate-600 dark:text-slate-400 text-sm bg-slate-100 dark:bg-slate-700 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-6"
                                        />
                                    ) : (
                                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-4">
                                            {note.content}
                                        </p>
                                    )}

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/50">
                                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                            {note.createdAt ? new Date(note.createdAt).toLocaleDateString('tr-TR') : 'Yeni'}
                                        </span>

                                        {editingNoteId === String(note.id) ? (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setEditingNoteId(null)}
                                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-xs font-bold text-slate-500"
                                                >
                                                    İptal
                                                </button>
                                                <button
                                                    onClick={() => handleUpdateNote(String(note.id))}
                                                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs font-bold"
                                                >
                                                    Kaydet
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    setEditingNoteId(String(note.id));
                                                    setEditForm({ title: note.title, content: note.content });
                                                }}
                                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-xs font-bold text-blue-600"
                                            >
                                                Düzenle
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="text-6xl mb-4 opacity-20 text-slate-400">📝</div>
                        <p className="text-slate-500 dark:text-slate-400 font-medium italic">
                            {!loading && NOTES_CONFIG.EMPTY_STATE}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotesPage;