"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import PrimaryButton from './PrimaryButton'
import { itemsNavbarB, itemsNavbarA } from '@/configs/items-navbar'
import Image from 'next/image'
import { AlignRightOutlined, ArrowRightOutlined, CloseOutlined } from '@ant-design/icons'
import Logo from "../public/imglogobank.png"

export default function Navbar() {

    const [isMenuOpen, setIsOpen] = useState<boolean>(false)

    const toogleOpen = () => {
        setIsOpen(!isMenuOpen)
    }

    return (
        <div className="w-full flex mr-5">
            <div className="w-[30%] lg:w-[20%] flex justify-center ml-5 mt-5">
                <Image
                    src={Logo}
                    alt="Picture of the author"
                    width={250}
                    height={250}
                    className="w-full sm:w-1/2 md:w-1/2 lg:w-full lg:h-[70px] "
                />
            </div>

            <div className="w-[80%] flex-col items-end pr-3 hidden lg:flex justify-center">
                <div className="w-[95%] justify-end flex p-2 gap-3 items-center border-b">
                    <Link className="px-4 text-sm text-blue-900 font-semibold cursor-pointer" href="">Personas</Link>
                    {itemsNavbarA.map((item, index) => (
                        <Link key={index} className="px-4 text-sm font-semibold cursor-pointer" href="">{item.name}</Link>
                    ))}
                    <PrimaryButton extendClassName="rounded-md" href="/login" label={"Banca por internet"} />
                </div>

                <div className="w-full justify-end flex gap-8 items-center truncate">
                    {itemsNavbarB.map((item, index) => (
                        <Link key={index} className="py-4 text-sm font-semibold hover:bg-slate-100 cursor-pointer" href="">{item.name}</Link>
                    ))}
                </div>
            </div>

            <AlignRightOutlined onClick={toogleOpen} className="text-blue-900 text-3xl block lg:hidden ml-auto m-4" />

            {isMenuOpen && (
                <div className="absolute left-0 w-full h-screen bg-white flex flex-col xl:hidden lg:hidden md:hidden z-40 pb-3 shadow-md shadow-slate-900">
                    <CloseOutlined onClick={toogleOpen} className='text-blue-900 text-3xl block lg:hidden ml-auto m-4' />
                    <div className="flex flex-col justify-start text-start px-4">
                        {itemsNavbarA.map((item, index) => (
                            <Link key={index} href={""} className="py-4 text-md border-b font-semibold cursor-pointer flex justify-between">
                                <h1>{item.name}</h1>
                                <ArrowRightOutlined />
                            </Link>
                        ))}
                        <Link className="py-4 text-md text-green-700 font-semibold cursor-pointer" href="">Banca 24/7</Link>
                        <Link className="py-4 text-md text-green-700 font-semibold cursor-pointer" href="">Contactanos</Link>
                    </div>

                    <PrimaryButton extendClassName="mx-4 text-center mt-3" href="/login" label={"Banca por internet"} />
                </div>
            )}

        </div>
    )
}
