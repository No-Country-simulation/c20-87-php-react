'use client'
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, Input, Select, SelectItem } from "@nextui-org/react";
import ListPay_services from '@/services/listpay_services';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useForm } from "react-hook-form";
import payservices_services from '@/services/payservices_services';
import { updateUser } from '@/store/authSlice';
import Link from 'next/link';

interface PropsServices {
  user_id: string
  amount: string
  number_client: string
  service_id: string
}

export default function PayServices() {
  const [listServices, setListServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<PropsServices>({
    defaultValues: {
      user_id: "",
      amount: "",
      number_client: "",
      service_id: ""
    }
  });

  const AUTH_TOKEN = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user[0]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchListServices = async () => {
      if (AUTH_TOKEN) {
        setLoading(true);
        const result = await ListPay_services(AUTH_TOKEN);
        setLoading(false);
        if (result.error) {
          alert(result.error);
        } else {
          setListServices(result);
        }
      }
    };

    fetchListServices();
  }, [AUTH_TOKEN]);

  if (loading) return <p>Loading...</p>;

  const SendServices = async (data: PropsServices) => {
    setProcessing(true);
    try {
      const responseServices = await payservices_services({ ...data, user_id: user.id }, AUTH_TOKEN!);
      if (responseServices.error) {
        alert(responseServices.error);
      } else {
        alert(responseServices.message || 'El pago se ha realizado con éxito');
        reset();
        dispatch(updateUser(responseServices.user[0]));
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className='w-full h-screen flex items-center justify-evenly bg-slate-100 p-4'>
      <Card className=" w-full md:w-1-2 lg:w-1/4 p-4">
        <CardBody>
          <h2 className="mb-4 text-center text-2xl font-semibold">Pago de Servicios</h2>
          <p className="mb-4 text-gray-600">
            Realiza pagos de servicios básicos como electricidad, agua, cable y más. Garantiza que tus servicios estén al día con la seguridad y facilidad de nuestra plataforma bancaria.
          </p>
          <form onSubmit={handleSubmit(SendServices)} className="flex flex-col">
            <Select
              label="Selecciona un servicio"
              placeholder="Selecciona un servicio"
              labelPlacement="outside"
              className="max-w-xs mb-4"
              disableSelectorIconRotation
              {...register("service_id", { required: "Es obligatorio" })}
            >
              {listServices.map((service) => (
                <SelectItem key={service.id} value={service.id}>
                  {service.name_service}
                </SelectItem>
              ))}
            </Select>
            <Input
              type="text"
              label="Número de cliente"
              placeholder="Número de cliente"
              labelPlacement="outside"
              className="mb-4"
              {...register("number_client", { required: "Es obligatorio" })}
            />
            <Input
              type="text"
              label="Monto a pagar"
              placeholder="Monto"
              labelPlacement="outside"
              {...register("amount", { required: "Es obligatorio" })}
            />
            <Button className="my-4" color="primary" type="submit" isLoading={processing}>
              {processing ? "Procesando..." : "Transferir"}
            </Button>
          </form>
          <Link href="/homebank/portal" className="text-blue-500 text-center">
          Regresar al portal
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}