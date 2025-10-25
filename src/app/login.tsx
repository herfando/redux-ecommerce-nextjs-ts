'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import { useRouter } from 'next/navigation';
import { login } from '../features/user/userSlice';

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    dispatch(login({ username, email }));
    router.push('/');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Login
      </button>
    </div>
  );
}
