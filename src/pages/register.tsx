import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { registerUser } from '../features/user/userSlice';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(registerUser({ username, password })).unwrap();
      router.push('/');
    } catch (err) {
      alert('Register failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border p-2 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Register
          </button>
        </form>
      </div>
    </>
  );
}
