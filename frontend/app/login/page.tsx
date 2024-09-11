"use client"
import PrimaryButton from '@/components/PrimaryButton'
import login_services from '@/services/login_services'
import { setCredentials } from '@/store/authSlice'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Form, Input } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux'

type FormData = {
    username: string
    password: any
}

export default function Login() {

    const dispatch = useDispatch();
    const router = useRouter(); 
  
    const onHandleData = async (data: FormData) => {
      try {
        const dataUser = await login_services(data);
        const {user , token} = dataUser.response
        localStorage.setItem('token', token);
        // console.log(success , user, token)
        dispatch(setCredentials({ token, user }));

        router.push('/homebank/portal');
      } catch (error) {
        console.error('Error durante la autenticación:', error);
      }
    };
  

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 bg-gradient-to-b from-blue-900 to-blue-500">
            <div className="absolute inset-0 bg-cover bg-center "
                style={{ backgroundImage: 'url(https://app.fintech.com/static/c19/login_bg.svg)', pointerEvents: 'none' }} />
            <h1 className="text-4xl font-bold text-white mb-8">InnovaBank</h1>
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Inicio de sesión</h1>
                <Form
                    name="login"
                    className="space-y-4"
                    initialValues={{ remember: true }}
                    onFinish={(values) => {
                        onHandleData(values)
                    }}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Por favor ingrese su nombre de usuario!' }]}>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Nombre de usuario"
                            className="border-gray-300 rounded-lg" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Por favor ingrese su contraseña!' }]}>
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="password"
                            className="border-gray-300 rounded-lg" />

                    </Form.Item>
                    <Form.Item className='flex justify-center items-center'>
                        <PrimaryButton extendClassName='px-24' label={"Iniciar sesión"} />
                    </Form.Item>
                </Form>
            </div>
            <p className='text-white mt-4'>No tienes una cuenta?
                <Link href="/register" className="text-white mt-4 underline ml-1">Regístrate</Link>
            </p>
        </div>
    );
}