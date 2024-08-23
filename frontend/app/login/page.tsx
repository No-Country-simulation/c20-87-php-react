import { StepBackwardOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'


export default function Login() {
    return (
        <div className="p-24 flex-col">
            <h1>LOGIN</h1>

            <ul>
                <li>Sidebar</li>
                <li>formulario de ingreso</li>
            </ul>

            <div className='flex flex-col gap-3'>
                <Link href="/portal">
                    <Button type="primary">IR A LA PAGINA DE PORTAL</Button>
                </Link>

                <Link href="/">
                    <Button type="primary">HOME</Button>
                </Link>
            </div>


        </div>
    )
}
