'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button} from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { updateUser } from '@/store/authSlice';

interface Credit {
  estado_credito: string;
  monto: string; // Cambio a string para coincidir con el formato de datos
  fecha_pago: string;
  created_at: string;
}

const ListCredit_url = "http://127.0.0.1:8000/api/infomacion_creditos"; 

export default function Credit() {

    return (
    <div className="px-12 lg:px-24 pb-10 mt-10 gap-3">
      <div className="lg:flex lg:justify-start mb-5">
        <h1><strong>Crédito disponible:</strong></h1>
      </div>
      <Divider className="my-4" />
      <div className="flex lg:flex-row flex-col mb-5">
        <div className="lg:flex lg:justify-start mb-5">
          <CreditNew />
        </div>
        <div className="lg:flex lg:justify-start mb-5 lg:ml-10 h-[300px]">
          <BannerImgCredit />
        </div>
      </div>

      <div className="lg:flex lg:justify-start mb-5">
        <h1><strong>Todos tus créditos:</strong></h1>
      </div>
      <Divider className="my-4" />
      <div className="lg:flex lg:justify-start mb-5">
        <TableCredits/>
      </div>
    </div>
  );
}

function BannerImgCredit() {
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h1 className="uppercase font-bold">Sal de todos esos apuros que puedas tener.</h1>
        <Divider className="my-4" />
      </CardHeader>
      <CardBody className="">
        <div className="flex gap-3">
          <div className="max-w-[740px]">
            <p className="text-large">En <b>Innovabank</b>, entendemos que cada cliente tiene necesidades únicas. Por eso, te ofrecemos una solución financiera personalizada que se adapta a tus circunstancias. Nuestro crédito flexible te permite acceder al dinero que necesitas de manera rápida y sencilla, ya sea para cubrir gastos imprevistos, consolidar deudas o financiar tus proyectos.</p>
          </div>
          <Image
            alt="Card background"
            src="/imgbank.jpg"
            className="rounded-xl"
            width={500}
            height={170}
          />
        </div>
      </CardBody>
    </Card>
  )
}

function CreditNew() {
    const user = useSelector((state: RootState) => state.auth.user[0]);
    const AUTH_TOKEN = useSelector((state: RootState) => state.auth.token);
    const solicitud_credit_url = "http://127.0.0.1:8000/api/pedir_credito";
    const dispatch = useDispatch();
    const handleRequestCredit = async () => {
      try {
        const response = await axios.post(
          solicitud_credit_url,
          {
            id_user: user.id,
          },
          {
            headers: {
              Authorization: `Bearer ${AUTH_TOKEN}`,
            },
          }
        );
    
        
        if (response.data.errors) {
          return { error: response.data.errors };
        }
    
        if (response.data.message && response.data.user) {
          return { message: response.data.message , user : response.data.user};
        }
        Swal.fire({
          title: 'Felicidades',
          text: response.data.response,
          icon: 'success'
        });
        dispatch(updateUser(response.data.user[0]));
      } catch (error: any) {
        if (error.response) {
          const { status, data } = error.response;
    
          Swal.fire({
            title: 'Lo lamentamos',
            text: data.response,
            icon: 'error'
          });
          if (data.response) {
            return { error: data.errors }; 
          }
    
          return { error: "Error en la solicitud", details: data };
        } else if (error.request) {
          console.error("No se recibió respuesta del servidor", error.request);
          return { error: "No se recibió respuesta del servidor" };
        } else {
          console.error("Error", error.message);
          return { error: error.message };
        }
      }
    };

    return (
        <Card className="max-w-[500px]">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">Hola, <strong>{user?.name} {user?.lastname}</strong></p>
            </div>
          </CardHeader>
          <CardBody>
            <p>Queremos contarte que tenemos un credito para ti.</p>
              <Image
                alt="Card background"
                src="/congrats.jpg"
                className="rounded-xl pt-4"
                width={385}
                height={140}
              />
          </CardBody>
          <CardFooter>
            <p className="px-7">Disponible <b>$100.000</b></p>
            <Button color="success" onClick={handleRequestCredit}>
              Solicitar Credito
            </Button>  
          </CardFooter>
        </Card>
      );
}

function TableCredits() {
  const AUTH_TOKEN = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user[0]);
  const [credits, setCredits] = useState<Credit[]>([]);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const response_credit = await axios.post(
          ListCredit_url,
          { id_user: user.id },
          {
            headers: {
              Authorization: `Bearer ${AUTH_TOKEN}`,
            },
          }
        );

        if (response_credit.data.errors) {
          console.error("Errores al obtener los créditos:", response_credit.data.errors);
          return;
        }

        if (Array.isArray(response_credit.data.response)) {          
          setCredits(response_credit.data.response);
        } else {
          setCredits([]); // O manejar el error como prefieras
        }
      } catch (error: any) {
        if (error.response) {
          console.error("Error de servidor:", error.response);
        } else if (error.request) {
          console.error("No se recibió respuesta del servidor", error.request);
        } else {
          console.error("Error al hacer la solicitud", error.message);
        }
      }
    };

    fetchCredits();
  }, [user, AUTH_TOKEN]);

  return (
    <Table isStriped aria-label="Example static collection table">
      <TableHeader>
        <TableColumn className="uppercase font-bold">Estado Crédito</TableColumn>
        <TableColumn className="uppercase font-bold">Monto</TableColumn>
        <TableColumn className="uppercase font-bold">Fecha Pago</TableColumn>
        <TableColumn className="uppercase font-bold">Fecha Solicitud</TableColumn>
        <TableColumn className="uppercase font-bold">Acción</TableColumn>
      </TableHeader>
      <TableBody>
      {credits.map((credit, index) => (
          <TableRow key={index}>
            <TableCell>{credit.estado_credito}</TableCell> 
            <TableCell>{credit.monto}</TableCell> 
            <TableCell>{credit.fecha_pago}</TableCell>
            <TableCell>{new Date(credit.created_at).toLocaleDateString('es-ES')}</TableCell>
            <TableCell>
              <Button 
                color={(credit.estado_credito !== 'vigente') ? '' : 'success' } 
                disabled={credit.estado_credito !== 'vigente'} // Deshabilitar el botón si es "vigente"
              >
                {(credit.estado_credito !== 'vigente') ? 'Pagado' : 'Pagar' }
              </Button>
            </TableCell>
          </TableRow>
        ))}
        {/*<TableRow key="1">
          <TableCell>Pagado</TableCell>
          <TableCell>$100.000</TableCell>
          <TableCell>15-09-2024</TableCell>
          <TableCell>01-09-2024</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>Pagado</TableCell>
          <TableCell>$150.000</TableCell>
          <TableCell>01-03-2024</TableCell>
          <TableCell>15-02-2024</TableCell>
        </TableRow>       */}
      </TableBody>
    </Table>
  );
}