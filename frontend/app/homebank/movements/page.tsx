"use client";

import React, { useEffect, useState } from 'react';
import NavbarPortal from '@/components/NavbarPortal';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@nextui-org/react';
import movements_services from '@/services/movements_services';
import { useSelector } from 'react-redux';
import { RootState } from "@/store/store";1
import { Button } from 'antd';

interface Movement {
  id: number;
  amount: string;
  created_at: string;
  type: string;
}

export default function MovementsPage() {
  const [data, setData] = useState<Movement[]>([]);
  const [filteredData, setFilteredData] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterId, setFilterId] = useState<string>('');
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const AUTH_TOKEN = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (AUTH_TOKEN) {
          const result = await movements_services(AUTH_TOKEN);
          setData(result);
          setFilteredData(result);
        }
      } catch (err) {
        setError('Error fetching movements');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [AUTH_TOKEN]);

  useEffect(() => {
    let filtered = data;

    if (filterId) {
      filtered = filtered.filter(m => m.id.toString().includes(filterId));
    }

    if (startDate) {
      filtered = filtered.filter(m => new Date(m.created_at) >= new Date(startDate));
    }

    if (endDate) {
      filtered = filtered.filter(m => new Date(m.created_at) <= new Date(endDate));
    }

    setFilteredData(filtered);
  }, [filterId, startDate, endDate, data]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'id') {
      setFilterId(value);
    } else if (name === 'startDate') {
      setStartDate(value);
    } else if (name === 'endDate') {
      setEndDate(value);
    }
  };

  const handleShowAll = () => {
    setFilterId('');
    setStartDate(null);
    setEndDate(null);
    setFilteredData(data);
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  if (loading) {
    return <div className="p-6">Cargando...</div>;
  }

  if (error) {
    return <div className="p-6">{error}</div>;
  }

  return (
    <>
      <NavbarPortal />
      <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Historial de Movimientos</h1>

        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4">Filtrar Movimientos</h2>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID de Transacción</label>
              <input
                type="text"
                id="id"
                name="id"
                value={filterId}
                onChange={handleFilterChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Ej. 12345"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={startDate || ''}
                onChange={handleFilterChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Fecha de Fin</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={endDate || ''}
                onChange={handleFilterChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <Button onClick={handleShowAll} type="primary" htmlType="submit" className={`bg-blue-900 p-2 shadow-lg text-white md:mt-6 ml-auto`}>
              Mostrar Todos
            </Button>
          </div>
        </div>

        <div className="shadow-md rounded-lg">
          <Table aria-label="Historial de Movimientos">
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>Monto</TableColumn>
              <TableColumn>Tipo</TableColumn>
              <TableColumn>Fecha</TableColumn>
            </TableHeader>
            <TableBody>
            {filteredData.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell>{movement.id}</TableCell>
                  <TableCell>{movement.amount}</TableCell>
                  <TableCell>{movement.type}</TableCell>
                  <TableCell>{formatDate(movement.created_at)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}