"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '../api/user-api'; 

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const result = await loginUser({ email, password });
    console.log('Login success:', result);

    const token = result.data?.access_token;
    const orgId = result.data?.user?.organisation_id;

    if (token) {
      localStorage.setItem('token', token); // ✅ Store JWT
    }

    if (orgId) {
      localStorage.setItem('org_id', orgId.toString()); // ✅ Store org ID
    }

    router.push('/dashboard'); // ✅ Navigate after login
  } catch (err: any) {
    console.error('Login failed:', err.message);
    alert('Login failed: ' + err.message);
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFE1E0] px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-[#7F55B1] mb-6">Sign In</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[#7F55B1] font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              className="w-full px-4 py-2 border border-[#9B7EBD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F49BAB]"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-[#7F55B1] font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              className="w-full px-4 py-2 border border-[#9B7EBD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F49BAB]"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#7F55B1] hover:bg-[#9B7EBD] text-white font-semibold rounded-xl transition duration-300"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-[#7F55B1] mt-4">
          Don’t have an account?{' '}
          <span className="text-[#F49BAB] font-medium cursor-pointer hover:underline">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
