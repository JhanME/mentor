'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'mentor' | 'becario'>('becario');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/?message=Registro exitoso, inicia sesión');
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#030916] p-4 text-white">
      <div className="z-10 flex w-full max-w-9xl items-center justify-between gap-16 lg:gap-40">
        <div className="hidden w-1/2 justify-center flex-col lg:flex">
          <Image
            src="/LOGO.png"
            alt="log mentor"
            width={900}
            height={900}
            className='object-contain'
            priority
          />
        </div>

        <div className="w-full max-w-2xl rounded-4xl bg-white p-8 text-gray-900 shadow-2xl lg:p-30">
          <div className="mb-8 text-center">
            <h2 className="text-xl font-bold text-gray-900">Crear Cuenta</h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre completo"
                className="w-full rounded-xl font-sans bg-gray-100 px-4 py-3 text-gray-900 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Dirección de correo electrónico"
                className="w-full rounded-xl font-sans bg-gray-100 px-4 py-3 text-gray-900 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            <div>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'mentor' | 'becario')}
                className="w-full rounded-xl font-sans bg-gray-100 px-4 py-3 text-gray-900 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >
                <option value="becario">Becario</option>
                <option value="mentor">Mentor</option>
              </select>
            </div>

            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  className="w-full rounded-xl font-sans bg-gray-100 px-4 py-3 text-gray-900 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmar contraseña"
                className="w-full rounded-xl font-sans bg-gray-100 px-4 py-3 text-gray-900 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-blue-500 py-3.5 font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 hover:shadow-blue-500/50 hover:-translate-y-0.5 font-sans disabled:opacity-50"
            >
              {loading ? 'Registrando...' : 'Crear Cuenta'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
          </div>

          <div className='flex flex-col items-center justify-center gap-3 my-8 w-full'>
            <Link
              href="/"
              className="text-sm font-bold text-blue-500 transition-all duration-300 hover:text-blue-600 hover:scale-110"
            >
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}