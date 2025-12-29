'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Credenciales inválidas');
    } else {
      router.push('/dashboard');
    }
  };

  const handleSocialLogin = (provider: string) => {
    signIn(provider, { callbackUrl: '/dashboard' });
  };

  return (
    // 1. FONDO GLOBAL OSCURO: Ocupa toda la pantalla
    // relative: para posicionar el grid de fondo absoluto
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#030916] p-4 text-white">
      

      {/* 3. CONTENEDOR PRINCIPAL (Centra todo el contenido) */}
      <div className="z-10 flex w-full max-w-9xl items-center justify-between gap-16 lg:gap-40">
        
        {/* --- LADO IZQUIERDO (BRANDING) --- */}
        {/* Texto flotando directamente sobre el fondo oscuro */}
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

        {/* --- LADO DERECHO (LA TARJETA/BOX) --- */}
        {/* Aquí está el cambio: Un div blanco con bordes redondeados (rounded-3xl) */}
        <div className="w-full max-w-2xl rounded-4xl bg-white p-8 text-gray-900 shadow-2xl lg:p-30">
          
          <div className="mb-8 text-center">
            <h2 className="text-xl font-bold text-gray-900">Iniciar Sesión</h2>
            
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Input Email */}
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

            {/* Input Password */}
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

            <button type="submit" className="mt-2 w-full rounded-xl bg-blue-500 py-3.5 font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 hover:shadow-blue-500/50 hover:-translate-y-0.5 font-sans">
              Iniciar Sesión
            </button>

          </form>

          {/* Social Login */}
          <div className="relative my-8 text-center">
            {/*<div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>*/}
            <span className="relative bg-white px-4 text-sm font-sans text-gray-400">O continúa con</span>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-100 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:border-gray-300 font-sans"
            >
              Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('github')}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-100 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:border-gray-300 font-sans"
            >
              GitHub
            </button>
          </div>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
          </div>
          
          <div className='flex flex-col items-center  justify-cenyter gap-3  my-8 w-full'>
            <Link 
              href="/recuperar" 
              className="text-sm text-gray-400 transition-all duration-300 my-1 hover:text-gray-500 hover:scale-110"
            >
              ¿Olvidaste tu contraseña?
            </Link>

            <Link 
              href="/registro" 
              className="text-sm font-bold text-blue-500 transition-all duration-300 hover:text-blue-600 hover:scale-110"
            >
              Crea tu cuenta gratis
            </Link>

            <div className='relative my-8 text-center px-4 text-sm justify-center'>
              <span className='font-sans text-gray-400 '>Todos los derechos reservardos </span>
            </div>
          </div>
          



        </div>
      </div>
    </div>
  );
}