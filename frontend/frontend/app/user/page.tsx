"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logoutUser, resetStatus } from '@/store/authSlice';
import { AppDispatch, RootState } from '@/store';
import ThemeToggle from '@/components/themeButton';

const LogoutPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, success, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (success) {
      router.push('/login');
      dispatch(resetStatus());
    }
  }, [success, router, dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-md w-full p-8 bg-white dark:bg-slate-800 shadow-lg rounded-xl border border-transparent dark:border-slate-700">
        <h1 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">
          Logout
        </h1>

        <div className="flex justify-center mb-6 ">
          <ThemeToggle />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleLogout}
          disabled={loading}
          className={`w-full py-2.5 rounded-md text-white font-semibold transition-all
            ${loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600'}`}
        >
          {loading ? 'Processing...' : 'Log Out'}
        </button>
      </div>
    </div>
  );
};

export default LogoutPage;