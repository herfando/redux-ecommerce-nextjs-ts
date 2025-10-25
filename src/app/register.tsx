'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { useRouter } from 'next/navigation';
import { login } from '../features/user/userSlice';

export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = () => {
    // pakai 'login' action untuk set user
    dispatch(login({ username, email }));
    router.push('/');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-xl font-bold mb-4">Register</h1>
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
        onClick={handleRegister}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Register
      </button>
    </div>
  );
}
