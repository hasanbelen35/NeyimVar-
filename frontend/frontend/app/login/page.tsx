"use client";

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { loginUser, resetStatus } from '@/store/authSlice';
import { AppDispatch, RootState } from '@/store';
import Input from '@/components/input';

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
      router.push('/'); 
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-black">Welcome Back</h1>

        {error && (
          <div className="p-3 bg-red-100 text-red-600 rounded-md text-sm border border-red-200 flex items-center gap-2">
            <span className="font-bold">⚠️</span> {error}
          </div>
        )}

        <Input 
          label="Email Address" 
          name="email" 
          type="email" 
          placeholder="example@mail.com"
          onChange={handleChange} 
          className="text-black"
          required 
        />

        <Input 
          label="Password" 
          name="password" 
          type="password" 
          placeholder="••••••••"
          onChange={handleChange} 
          className="text-black"
          required 
        />

        <button 
          type="submit" 
          disabled={loading}
          className={`w-full py-2.5 rounded-md text-white font-semibold transition
            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don&apos;t have an account?{" "}
          <span 
            className="text-blue-600 cursor-pointer hover:underline"
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