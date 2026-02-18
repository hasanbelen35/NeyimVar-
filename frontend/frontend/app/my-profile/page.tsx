"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getProfile } from "@/store/profileSlice";
import ThemeToggle from "@/components/themeButton";
import { useRouter } from "next/navigation";
import BackButton from '@/components/BackButton';

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
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
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 p-6">
      <div className="max-w-4xl mx-auto flex flex-col items-start">
        
        <BackButton />

        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-md mx-auto bg-white dark:bg-slate-800 shadow-2xl rounded-3xl overflow-hidden border border-transparent dark:border-slate-700 mt-4">
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
            
            <button
              onClick={() => router.push('/edit-profile')}
              className="mt-6 px-6 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 
                border border-slate-200 dark:border-slate-700 rounded-full
                hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 
                hover:border-blue-200 dark:hover:border-blue-800
                transition-all duration-300 uppercase tracking-widest active:scale-95"
            >
              Profilini Düzenle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;