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
        </>
    )
}
