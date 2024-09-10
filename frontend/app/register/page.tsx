"use client"
import PrimaryButton from '@/components/PrimaryButton'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { Form, Input, Select } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

export default function Login() {
    const [phoneNumber, setPhoneNumber] = useState("");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 bg-gradient-to-b from-blue-900 to-blue-500">
            <div className="absolute inset-0 bg-cover bg-center "
                style={{ backgroundImage: 'url(https://app.fintech.com/static/c19/login_bg.svg)', pointerEvents: 'none' }} />
            <h1 className="text-4xl font-bold text-white mb-8">InnovaBank</h1>
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Registro de cuenta</h1>
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
                            placeholder="Nombre de usuario"
                            className="border-gray-300 rounded-lg" />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        rules={[
                            { required: true, message: 'Por favor ingrese su nombre!' },
                            { pattern: /^[A-Za-z-ñ\s]*$/, message: 'Por favor ingrese solo texto.' }
                        ]}>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Nombre"
                            className="border-gray-300 rounded-lg" />
                    </Form.Item>
                    <Form.Item
                        name="lastname"
                        rules={[
                            { required: true, message: 'Por favor ingrese su apellido!' },
                            { pattern: /^[A-Za-z-ñ\s]*$/, message: 'Por favor ingrese solo texto.' }
                        ]}>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Apellido"
                            className="border-gray-300 rounded-lg" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Por favor ingrese su correo electrónico!' },
                            { type: 'email', message: 'Por favor ingrese un correo electrónico válido!' }
                        ]}>
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Correo electrónico"
                            className="border-gray-300 rounded-lg" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Por favor ingrese su contraseña!' }]}>
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Contraseña"
                            className="border-gray-300 rounded-lg" />
                    </Form.Item>
                    <Form.Item
                        name="phone-number"
                        rules={[{ required: true, message: 'Por favor ingrese su número de celular!' }]}>
                        <PhoneInput
                            defaultCountry="US"
                            international
                            placeholder="Número de celular"
                            value={phoneNumber}
                            onChange={(value) => setPhoneNumber(value || '')}
                            className="block w-full border border-gray-300 rounded-lg px-3 py-1" />
                    </Form.Item>
                    <Form.Item
                        name="type_user"
                        rules={[{ required: true, message: 'Por favor escoja su tipo de usuario!' }]}
                        label="Tipo de usuario">
                        <Select placeholder="Selecciona un tipo de usuario" className="border-gray-300 rounded-lg">
                            <Select.Option value="1">Cliente</Select.Option>
                            <Select.Option value="2">Empresa</Select.Option>
                            <Select.Option value="3">Administrador</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item className='flex justify-center items-center'>
                        <PrimaryButton extendClassName='px-24' label={"Registrarse"} />
                    </Form.Item>
                </Form>
            </div>
            <p className='text-white mt-4'>Ya tienes una cuenta?
                <Link href="/login" className=" text-white mt-4 underline ml-1">Inicia sesión</Link>
            </p>
        </div>
    );
}
