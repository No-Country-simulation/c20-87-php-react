'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardBody } from "@nextui-org/react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'; 
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function ContactLayout() {
    const [loading, setLoading] = useState(true);

    const AUTH_TOKEN = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        // Simulate fetching data
        if (AUTH_TOKEN) {
            setLoading(false);
        }
    }, [AUTH_TOKEN]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className='w-full h-screen flex items-center justify-center bg-slate-100 p-4'>
            <Card className="w-full md:w-1/2 lg:w-1/3 p-6">
                <CardBody>
                    <h2 className="mb-4 text-center text-2xl font-semibold">Datos de Contacto</h2>
                    <p className="mb-4 text-gray-600">
                        No dude en comunicarse las 24hs del día por los diferentes medios de comunicación que se brindan a continuación:
                    </p>
                    <div className="flex items-start mb-2">
                        <FaMapMarkerAlt className="mr-2 text-lg" />
                        <p className="text-base">
                            <strong>Dirección:</strong> Florida 900, Capital Federal, Buenos Aires, Argentina.
                        </p>
                    </div>
                    <div className="flex items-start mb-2">
                        <FaPhoneAlt className="mr-2 text-lg" />
                        <p className="text-base">
                            <strong>Teléfono:</strong> +549 63638559.
                        </p>
                    </div>
                    <div className="flex items-start mb-2">
                        <FaEnvelope className="mr-2 text-lg" />
                        <p className="text-base">
                            <strong>Correo electrónico:</strong> contact@InnovaBank.com
                        </p>
                    </div>
                    <br />
                    <Link href="/homebank/portal" className="text-blue-500 text-center">
                        Regresar al portal
                    </Link>
                </CardBody>
            </Card>
        </div>
    );
}


