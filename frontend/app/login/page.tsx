"use client"
import PrimaryButton from '@/components/PrimaryButton'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Form, Input } from 'antd'
import Link from 'next/link'
import React from 'react'

export default function Login() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 bg-gradient-to-b from-blue-900 to-blue-500">
            <div className="absolute inset-0 bg-cover bg-center "
                style={{ backgroundImage: 'url(https://app.fintech.com/static/c19/login_bg.svg)', pointerEvents: 'none' }} />
            <h1 className="text-4xl font-bold text-white mb-8">InnovaBank</h1>
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                <Form
                    name="login"
                    className="space-y-4"
                    initialValues={{ remember: true }}
                    onFinish={(values) => {
                        console.log('Success:', values);
                    }}>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Por favor ingrese su nombre de usuario!' }]}>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Username"
                            className="border-gray-300 rounded-lg" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Por favor ingrese su contraseña!' }]}>
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            className="border-gray-300 rounded-lg" />
                    </Form.Item>
                    <Form.Item className='flex justify-center items-center'>
                        <PrimaryButton extendClassName='px-24' label={"Log in"} />
                    </Form.Item>
                </Form>
                <div className="mt-4 flex justify-between">
                    <Link href="/portal" className="text-blue-500 hover:underline">
                        Go to Portal
                    </Link>
                    <Link href="/" className="text-blue-500 hover:underline">
                        Home
                    </Link>
                </div>
            </div>
            <p className='text-white mt-4'>No tienes una cuenta? 
                <Link href="/register" className="text-blue-500 text-white mt-4 underline ml-1">Registrate</Link>
            </p>
        </div>
    );
}