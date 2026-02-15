"use client";

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { loginUser, resetStatus } from '@/store/authSlice';
import { AppDispatch, RootState } from '@/store/store';
import Input from '@/components/input';
import ThemeToggle from '@/components/themeButton';

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading, error, success } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (success) {
      router.push('/edit-profile'); 
      dispatch(resetStatus());
    }
  }, [success, router, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 p-4 transition-colors duration-300">
      
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md p-8 bg-white dark:bg-slate-800 shadow-2xl rounded-2xl space-y-6 border border-transparent dark:border-slate-700 transition-all"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-center text-slate-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-center text-slate-500 dark:text-slate-400 text-sm">
            Please enter your details to sign in
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm border border-red-200 dark:border-red-800 flex items-center gap-2 animate-shake">
            <span>⚠️</span> {error}
          </div>
        )}

        <div className="space-y-4">
          <Input 
            label="Email Address" 
            name="email" 
            type="email" 
            placeholder="example@mail.com"
            onChange={handleChange} 
            className="text-black dark:text-white dark:bg-slate-900 dark:border-slate-700"
            required 
          />

          <Input 
            label="Password" 
            name="password" 
            type="password" 
            placeholder="••••••••"
            onChange={handleChange} 
            className="text-black dark:text-white dark:bg-slate-900 dark:border-slate-700"
            required 
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white font-bold shadow-lg transition-all transform active:scale-95
            ${loading 
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400'}`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Logging in...
            </span>
          ) : 'Login'}
        </button>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
          Don&apos;t have an account?{" "}
          <span 
            className="text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline underline-offset-4"
            onClick={() => router.push('/register')}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;