import axios from 'axios';

export interface LoginProps {
    username: string;
    password: string;
}

export default async function login_services({ username, password }: LoginProps) {
    try {
        await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', { withCredentials: true });

        const cookies = document.cookie
            .split('; ')
            .find(row => row.startsWith('XSRF-TOKEN'))
            ?.split('=')[1];

        console.log("Token CSRF:", cookies);

        const response = await axios.post("http://127.0.0.1:8000/api/login_user", {
            username: username,
            password: password
        }, {
            withCredentials: true,
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
        },
        );

        console.log('Login exitoso, datos del servidor:', response.data);

        return response.data;
    } catch (error) {
        if (error) {
            console.error('Error de respuesta del servidor:', error);
        } else {
            console.error('Error al iniciar sesión:', error);
        }
        throw error;
    }
}


// 'use client'
// import login_services from '@/services/login_services'
// import React from 'react'
// import { useForm } from "react-hook-form"

// type FormData = {
//   firstName: string
//   password: string
// }

// export default function Login() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>()


//   const onHandleData = async (data: FormData) => {
//     try {
      
//       const response = await login_services({
//         username: data.firstName,
//         password: data.password
//       });
      
//       console.log(response); 
//     } catch (error) {
//       console.error("Error durante la autenticación:", error); 
//     }

//     console.log(data)
//   };

//   return (
//     <form className="flex flex-col w-1/4 gap-4 justify-center m-auto p-4" onSubmit={handleSubmit(onHandleData)}>
//       <label>First Name</label>
//       <input 
//         className="border-2 border-black" 
//         {...register("firstName", { required: true })}
//       />
//       {errors.firstName && <span>Este campo es requerido</span>}

//       <label>Password</label>
//       <input 
//         type="password" 
//         className="border-2 border-black" 
//         {...register("password", { required: true })}
//       />
//       {errors.password && <span>Este campo es requerido</span>}

//       <button
//         className='bg-blue-600 p-2 text-white'
//         type="submit"
//       >
//         Enviar
//       </button>
//     </form>
//   )
// }