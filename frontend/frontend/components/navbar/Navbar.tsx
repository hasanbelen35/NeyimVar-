"use client";

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getProfile } from "@/store/profileSlice";
import { useRouter } from 'next/navigation';
import ThemeToggle from '../themeButton';
import { logoutUser } from '@/store/authSlice';
import UserAvatar from '@/components/UserAvatar';
import DropdownMenu from '@/components/DropdownMenu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { username, avatarUrl, department, hasFetched } = useSelector(
    (state: RootState) => state.profile
  );

  useEffect(() => {
    if (!hasFetched) {
      dispatch(getProfile());
    }
  }, [dispatch, hasFetched]);

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await dispatch(logoutUser()).unwrap();
      setIsMenuOpen(false);
      router.push('/login');
    } catch (error) {
      console.error('Çıkış yapılırken hata oluştu:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <div
            onClick={() => handleNavigate("/home")}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:rotate-6 transition-transform">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Note<span className="text-blue-600">App</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(prev => !prev)}
                className={`rounded-full border-2 transition-all p-0.5 ${isMenuOpen ? 'border-blue-500' : 'border-transparent hover:border-blue-500'}`}
              >
                <UserAvatar avatarUrl={avatarUrl} username={username} size="sm" />
              </button>

              {isMenuOpen && (
                <DropdownMenu
                  username={username}
                  avatarUrl={avatarUrl}
                  department={department}
                  isLoggingOut={isLoggingOut}
                  onNavigate={handleNavigate}
                  onLogout={handleLogout}
                  onClose={() => setIsMenuOpen(false)}
                />
              )}
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;