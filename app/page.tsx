'use client';

import { useState } from 'react';
import { Dice1, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    // 1. FONDO GLOBAL OSCURO: Ocupa toda la pantalla
    // relative: para posicionar el grid de fondo absoluto
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#030916] p-4 text-white">
      

      {/* 3. CONTENEDOR PRINCIPAL (Centra todo el contenido) */}
      <div className="z-10 flex w-full max-w-9xl items-center justify-between gap-16 lg:gap-40">
        
        {/* --- LADO IZQUIERDO (BRANDING) --- */}
        {/* Texto flotando directamente sobre el fondo oscuro */}
        <div className="hidden w-1/2 flex-col lg:flex"> 
        </div>

        {/* --- LADO DERECHO (LA TARJETA/BOX) --- */}
        {/* Aquí está el cambio: Un div blanco con bordes redondeados (rounded-3xl) */}
        <div className="w-full max-w-2xl rounded-4xl bg-white p-8 text-gray-900 shadow-2xl lg:p-30">
          
          <div className="mb-8 text-center">
            <h2 className="text-xl font-bold text-gray-900">Iniciar Sesión</h2>
            
          </div>

          <form className="flex flex-col gap-5">
            
            {/* Input Email */}
            <div>
              <input 
                type="Email o username" 
                placeholder="Dirección de correo electrónico"
                className="w-full rounded-xl  font-sans  bg-gray-100 px-4 py-3 text-gray-900 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Input Password */}
            <div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Contraseña"
                  className="w-full rounded-xl  font-sans bg-gray-100 px-4 py-3 text-gray-900 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
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

            <button className="mt-2 w-full rounded-xl bg-blue-500 py-3.5 font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 hover:shadow-blue-500/50 hover:-translate-y-0.5 font-sans">
              Iniciar Sesión
            </button>

          </form>

          {/* Social Login */}
          <div className="relative my-8 text-center">
            {/*<div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>*/}
            <span className="relative bg-white px-4 text-sm font-sans text-gray-400">O continúa con</span>
          </div>

          <div className="flex gap-4">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-100 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:border-gray-300 font-sans">
              Google
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl  bg-gray-100 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:border-gray-300 font-sans">
               GitHub
              
            </button>
          </div>       
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
          </div>

          <div className="relative  my-2 text-center">
            <span className="relative font-sans bg-white px-4 text-sm text-gray-400">¿Olvidaste tu contraseña?</span>
          </div>

          <div className='relative text-center'>
            <span className='relative font-sans bg-white px-4 text-sm text-blue-600 '>Crea tu cuenta gratis</span>
          </div>



        </div>
      </div>
    </div>
  );
  }