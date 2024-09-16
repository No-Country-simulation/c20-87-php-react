'use client';
import React, { useState } from 'react'
import SearchComponent from './SearchComponent'
import { QuickAccess } from './QuickAccess'
import { UserOutlined, RightOutlined } from '@ant-design/icons';
import { Card, Switch } from 'antd';
import Link from 'next/link';

export const HomeBank = () => {

  const [showBalances, setShowBalances] = useState(true);

  const handleSwitchChange = (checked: boolean) => {
    setShowBalances(checked);
  };

  return (
    <div className="px-12 lg:px-24 bg-gray-100 pb-10">
      <div className="w-full flex-wrap flex justify-center bg-gray-100 lg:justify-evenly mb-10 pt-10">
        <SearchComponent placeholderText="Buscar operaciones, productos, secciones y consultas" width="75%" />
      </div>
      <div className="flex justify-between">
        <h4 className="text-lg lg:text-start font-light">Hola, <b className='font-bold'>Alexis Jose</b></h4>
        <div className="flex md:flex-row flex-col items-center space-x-2">
          <span className="text-sm text-gray-600 font-light">Ocultar saldos</span>
          <Switch
            checked={showBalances}
            onChange={handleSwitchChange}
            className="ml-2 md:ml-0"
          />
        </div>
      </div>
      <h4 className="text-lg font-light my-7">Estado de cuenta</h4>
      <Card className="bg-white shadow-md w-full md:w-1/2 lg:w-1/4">
        <h5 className="text-md font-bold">Cuenta unica</h5>
        <p>Pesos *****</p>
        <p>$ ******</p>
        <a
          href="/transaction-history"
          className="flex items-center space-x-2 text-sm text-gray-600 font-light">
          <RightOutlined className="text-gray-500" style={{ fontSize: '16px' }} />
          <span>Ver movimientos</span>
        </a>
      </Card>
      <h4 className="text-lg font-light my-7">Accesos rápidos</h4>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-6 lg:ml-10">
        <QuickAccess icon={<UserOutlined />} text="Transferencias" href="/transfers" backgroundColor='bg-white' />
        <QuickAccess icon={<UserOutlined />} text="Pagos de servicios" href="/payments-of-services" backgroundColor='bg-white' />
        <QuickAccess icon={<UserOutlined />} text="Prestamos" href="/loans" backgroundColor='bg-white' />
        <QuickAccess icon={<UserOutlined />} text="Seguros" href="/insurance" backgroundColor='bg-white' />
        <QuickAccess icon={<UserOutlined />} text="Superfondos" href="/superfunds" backgroundColor='bg-white' />
        <QuickAccess icon={<UserOutlined />} text="Centro de Ayuda" href="/help-center" backgroundColor='bg-white' />
      </div>

      <Card className="bg-white shadow-md p-5 relative">
        <div className="relative z-10">
          <h5 className="text-left text-lg font-bold">
            Brindale a tu familia la protección que necesita
          </h5>
          <p className="text-sm text-gray-600 mb-3">
            Disfrutá sin preocupaciones con tu Seguro de Vida Santander, <br />
            tendrás atención medica las 24 horas. Pedilo 100% online.
          </p>
          <Link
            href="/consult"
            className="ring-1 ring-blue-500 text-blue-500 py-1 px-4 rounded-full inline-block text-center">
            Consultar
          </Link>
        </div>
        <img
          src="seguro.png"
          alt="Imagen de fondo"
          className="w-full h-auto max-w-md object-fit md:absolute md:right-0 md:top-0 md:h-full" />
      </Card>

    </div>
  )
}