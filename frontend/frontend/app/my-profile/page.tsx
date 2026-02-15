"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getProfile } from "@/store/profileSlice";
import ThemeToggle from "@/components/themeButton";

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { username, university, department, avatarUrl, bio, loading, error } = useSelector(
    (state: RootState) => state.profile
  );

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="animate-pulse text-blue-600 font-bold uppercase tracking-widest">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 p-4 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md bg-white dark:bg-slate-800 shadow-2xl rounded-3xl overflow-hidden border border-transparent dark:border-slate-700">
        <div className="h-32 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-500 dark:to-indigo-600" />
        
        <div className="p-8 pt-0 -mt-16 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 flex items-center justify-center mb-4 bg-white">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl font-black text-slate-300 uppercase">
                {username?.charAt(0) || "U"}
              </span>
            )}
          </div>

          <div className="text-center space-y-1 mb-8">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              @{username || "isimsiz_kullanici"}
            </h1>
            <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">
              {department || "Bölüm Belirtilmedi"}
            </p>
          </div>

          <div className="w-full space-y-3">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
              <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest block mb-1">
                Üniversite
              </span>
              <p className="text-slate-700 dark:text-slate-200 font-semibold text-sm">
                {university || "Belirtilmedi"}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
              <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest block mb-1">
                Hakkında
              </span>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic">
                {bio ? `"${bio}"` : "Henüz bir biyografi eklenmemiş."}
              </p>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-500 text-xs text-center w-full">
              {error}
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 w-full flex justify-center">
            <button className="text-xs font-bold text-slate-400 dark:text-slate-500 hover:text-blue-500 transition-colors uppercase tracking-widest">
              Profili Paylaş
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;