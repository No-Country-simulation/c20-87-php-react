"use client"
import Link from 'next/link'
import React from 'react'
import { UserOutlined, PoweroffOutlined } from '@ant-design/icons'

export default function NavbarPortal() {
    return (
        <div className="w-full bg-slate-800 h-20 flex justify-between items-center text-white">
            <div className="pl-4">
                <h1 className="text-2xl font-bold">InnovaBank</h1>
            </div>
            <nav className="pr-4">
                <ul className="flex justify-between">
                    <li className="mr-4">
                        <Link href="/homebank/perfil" className="cursor-pointer">
                            <span className="flex flex-col items-center">
                                <UserOutlined className="mb-2" />
                                <span className="text-sm">Perfil</span>
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/login" className="cursor-pointer">
                            <span className="flex flex-col items-center">
                                <PoweroffOutlined className="mb-2" />
                                <span className="text-sm">Salir</span>
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}