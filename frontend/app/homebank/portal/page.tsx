import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'
import NavbarPortal from '@/components/NavbarPortal'
import { HomeBank } from '@/components/HomeBank'

export default function Portal() {

    return (
        <>
            <NavbarPortal />
            <HomeBank />
            {/* <div className="p-24 flex flex-col items-center gap-3">
                <h1>Home de nuestra cuenta de banco</h1>
                <ul>
                    <li>Navbar</li>
                    <li>Cuentas bancarias</li>
                    <li>Favoritos</li>
                    <li>Transferir dinero</li>
                </ul>

                <div className='flex flex-col gap-3'>
                    <Link href="/login">
                        <Button type="primary">IR A LA PAGINA DE PRINCIPAL</Button>
                    </Link>
                    <Link href="/">
                        <Button type="primary">HOME</Button>
                    </Link>
                    <Link href="/homebank/perfil">
                        <Button type="primary">perfil</Button>
                    </Link>
                    
                    <Link href="/homebank/transferencia">
                        <Button type="primary">transs</Button>
                    </Link>
               
                </div>
            </div> */}
        </>
    )
}
