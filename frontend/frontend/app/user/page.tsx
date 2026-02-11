"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logoutUser, resetStatus } from '@/store/authSlice';
import { AppDispatch, RootState } from '@/store';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Logout</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 border border-red-200 rounded">
            {error}
          </div>
        )}

        <button
          onClick={handleLogout}
          disabled={loading}
          className={`w-full py-2.5 rounded-md text-white font-semibold transition
            ${loading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'}`}
        >
          {loading ? 'Processing...' : 'Log Out'}
        </button>
      </div>
    </div>
  );
};

export default LogoutPage;