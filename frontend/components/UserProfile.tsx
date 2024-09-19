"use client"; // Marca el componente como Client Component

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Usa next/navigation en lugar de next/router

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Usa useRouter desde next/navigation

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtén el token desde localStorage
        if (!token) {
          router.push('/login'); // Redirige a la página de login si no hay token
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/api/perfil_usuario', {
          headers: {
            Authorization: `Bearer ${token}`, // Incluye el token en las cabeceras
          },
        });

        setUserData(response.data);
      } catch (error) {
        setError('Error al obtener los datos del usuario');
        console.error('Error al obtener los datos del usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return <p className="text-center text-gray-500">Cargando...</p>; // Mensaje de carga mientras se obtienen los datos
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>; // Mensaje de error si algo sale mal
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg pt-4 mt-16">
      <div className="flex items-center mb-6">
        <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-4xl font-bold text-white">
          {userData.username[0]}
        </div>
        <div className="ml-6">
          <h1 className="text-3xl font-semibold mb-2">{userData.name}</h1>
          <p className="text-lg text-gray-600">{userData.username}</p>
          <p className="text-lg text-gray-600">{userData.email}</p>
        </div>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
        <p className="text-lg font-medium mb-2">Número de Teléfono:</p>
        <p className="text-lg text-gray-600">{userData.phone_number || 'No disponible'}</p>
        <div className="flex justify-end mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
            Editar Perfil
          </button>
        </div>
      </div>
    </div>
  );
};

// Función para mostrar el tipo de usuario
const getUserType = (type: number) => {
  switch (type) {
    case 1:
      return 'Cliente';
    case 2:
      return 'Empresa';
    case 3:
      return 'Administrador';
    default:
      return 'Desconocido';
  }
};

export default UserProfile;
