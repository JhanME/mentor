'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Becario {
  id: string;
  name: string;
  email: string;
}

export default function MentorDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [becarios, setBecarios] = useState<Becario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session || session.user.role !== 'mentor') {
      router.push('/');
      return;
    }

    fetchBecarios();
  }, [session, status, router]);

  const fetchBecarios = async () => {
    try {
      const response = await fetch('/api/mentor/becarios');
      if (response.ok) {
        const data = await response.json();
        setBecarios(data);
      }
    } catch (error) {
      console.error('Error fetching becarios:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Mentor</h1>
              <p className="text-gray-600">Bienvenido, {session?.user.name}</p>
            </div>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Becarios Asignados */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">B</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Becarios Asignados
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {becarios.length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Mentorías Programadas */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">M</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Mentorías Programadas
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        0
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Tareas Pendientes */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">T</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Tareas Pendientes
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        0
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de Becarios */}
          <div className="mt-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Mis Becarios
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Lista de becarios asignados para mentorías
                </p>
              </div>
              <ul className="divide-y divide-gray-200">
                {becarios.length === 0 ? (
                  <li className="px-4 py-4 text-center text-gray-500">
                    No tienes becarios asignados aún
                  </li>
                ) : (
                  becarios.map((becario) => (
                    <li key={becario.id} className="px-4 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {becario.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {becario.email}
                          </p>
                        </div>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                          Ver Detalles
                        </button>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}