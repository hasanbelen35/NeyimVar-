"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { createNote, resetNoteStatus } from "@/store/noteSlice";
import ThemeToggle from "@/components/themeButton";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
// CONFIG SECTION 
const PAGE_CONFIG = {
  title: "Create New Note",
  description: "Capture your thoughts and ideas",
  labels: {
    title: "Title",
    content: "Content",
  },
  placeholders: {
    title: "Give your note a catchy title...",
    content: "Write your details here...",
  },
  buttons: {
    cancel: "Cancel",
    create: "Create Note",
    loading: "Creating...",
  },
  messages: {
    fallbackError: "An error occurred while creating the note.",
  },
};

const AddNotePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading, error, success } = useSelector((state: RootState) => state.notes);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (success) {
      dispatch(resetNoteStatus());
      router.push("/notes");
    }
  }, [success, dispatch, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;
    dispatch(createNote(formData));
  };

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 p-4 transition-colors duration-300">



      <div className="w-full max-w-2xl p-8 bg-white dark:bg-slate-800 shadow-2xl rounded-2xl space-y-6 border border-transparent dark:border-slate-700 transition-all">
        <div>
          <BackButton />
        </div>
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {PAGE_CONFIG.title}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {PAGE_CONFIG.description}
          </p>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg text-xs mt-2">
              {error}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {PAGE_CONFIG.labels.title}
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              type="text"
              required
              placeholder={PAGE_CONFIG.placeholders.title}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-black dark:text-white p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-semibold"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {PAGE_CONFIG.labels.content}
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={8}
              placeholder={PAGE_CONFIG.placeholders.content}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-black dark:text-white p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none leading-relaxed"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-3 rounded-xl text-slate-700 dark:text-slate-200 font-bold border border-slate-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all active:scale-95"
            >
              {PAGE_CONFIG.buttons.cancel}
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`flex-[2] py-3 rounded-xl text-white font-bold shadow-lg transition-all transform active:scale-95 ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
                }`}
            >
              {loading ? PAGE_CONFIG.buttons.loading : PAGE_CONFIG.buttons.create}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNotePage;