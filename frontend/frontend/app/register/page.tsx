"use client";

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { registerUser, resetStatus } from '@/store/authSlice';
import { AppDispatch, RootState } from '@/store';
import Input from '@/components/input';

const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading, success, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (success) {
      alert("Registration successful! Redirecting...");
      router.push('/login');
      dispatch(resetStatus());
    }
  }, [success, router, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-black">Create Account</h1>

        {/* ERROR MESSAGES */}
        {error && (
          <div className="p-3 bg-red-100 text-red-600 rounded-md text-sm border border-red-200 flex items-center gap-2 animate-in fade-in duration-300">
             {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Input label="First Name" name="name" className='text-black' onChange={handleChange} required />
          <Input label="Last Name" name="surname" className='text-black' onChange={handleChange} required />
        </div>

        <Input
          label="Email"
          name="email"
          type="email"
          onChange={handleChange}
          className='text-black'
          required
        />

        <Input
          label="Password"
          name="password"
          type="password"
          onChange={handleChange}
          className='text-black'
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 rounded-md text-white font-semibold transition
            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Processing...' : 'Sign Up'}
        </button>

             <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
          Do you &apos;t have already an account?{" "}
          <span 
            className="text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline underline-offset-4"
            onClick={() => router.push('/login')}
          >
            Sign In
          </span>
        </p>


      </form>
    </div>
  );
};

export default RegisterPage;