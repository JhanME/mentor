'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Mentoria {
  id: string;
  date: string;
  topics: string;
  status: string;
}

interface Tarea {
  id: string;
  description: string;
  status: string;
  dueDate: string | null;
}

export default function BecarioDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mentorias, setMentorias] = useState<Mentoria[]>([]);
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session || session.user.role !== 'becario') {
      router.push('/');
      return;
    }

    fetchMentorias();
    fetchTareas();
  }, [session, status, router]);

  const fetchMentorias = async () => {
    try {
      const response = await fetch('/api/becario/mentorias');
      if (response.ok) {
        const data = await response.json();
        setMentorias(data);
      }
    } catch (error) {
      console.error('Error fetching mentorias:', error);
    }
  };

  const fetchTareas = async () => {
    try {
      const response = await fetch('/api/becario/tareas');
      if (response.ok) {
        const data = await response.json();
        setTareas(data);
      }
    } catch (error) {
      console.error('Error fetching tareas:', error);
    } finally {
      setLoading(false);
    }
  };

  const marcarTareaCompletada = async (tareaId: string) => {
    try {
      const response = await fetch(`/api/becario/tareas/${tareaId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'completed' }),
      });

      if (response.ok) {
        setTareas(tareas.map(t =>
          t.id === tareaId ? { ...t, status: 'completed' } : t
        ));
      }
    } catch (error) {
      console.error('Error updating tarea:', error);
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
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Becario</h1>
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
            {/* Mentorías Programadas */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">M</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Mentorías Programadas
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {mentorias.length}
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
                        {tareas.filter(t => t.status === 'pending').length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Tareas Completadas */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">✓</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Tareas Completadas
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {tareas.filter(t => t.status === 'completed').length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de Mentorías */}
          <div className="mt-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Mis Mentorías
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Lista de mentorías programadas
                </p>
              </div>
              <ul className="divide-y divide-gray-200">
                {mentorias.length === 0 ? (
                  <li className="px-4 py-4 text-center text-gray-500">
                    No tienes mentorías programadas
                  </li>
                ) : (
                  mentorias.map((mentoria) => (
                    <li key={mentoria.id} className="px-4 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {new Date(mentoria.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            Temas: {mentoria.topics}
                          </p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            mentoria.status === 'completed' ? 'bg-green-100 text-green-800' :
                            mentoria.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {mentoria.status}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>

          {/* Lista de Tareas */}
          <div className="mt-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Mis Tareas
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Tareas asignadas por tu mentor
                </p>
              </div>
              <ul className="divide-y divide-gray-200">
                {tareas.length === 0 ? (
                  <li className="px-4 py-4 text-center text-gray-500">
                    No tienes tareas asignadas
                  </li>
                ) : (
                  tareas.map((tarea) => (
                    <li key={tarea.id} className="px-4 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {tarea.description}
                          </p>
                          {tarea.dueDate && (
                            <p className="text-sm text-gray-500">
                              Fecha límite: {new Date(tarea.dueDate).toLocaleDateString()}
                            </p>
                          )}
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            tarea.status === 'completed' ? 'bg-green-100 text-green-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {tarea.status === 'completed' ? 'Completada' : 'Pendiente'}
                          </span>
                        </div>
                        {tarea.status === 'pending' && (
                          <button
                            onClick={() => marcarTareaCompletada(tarea.id)}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                          >
                            Marcar Completada
                          </button>
                        )}
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