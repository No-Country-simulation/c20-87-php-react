import React from 'react';
import CashIcon from '@/public/imgs/CashIcon';
import Creditcard from '@/public/imgs/CreditCard';
import PersonIcon from '@/public/imgs/PersonIcon';
import PiggyBanckIcon from '@/public/imgs/PiggyBanckIcon';
import ShieldCheckIcon from '@/public/imgs/ShieldCheckIcon';
import WalletIcon from '@/public/imgs/WalletIcon';
import OptionCard from './OptionCards';
import Image from 'next/image';
import PrimaryButton from './PrimaryButton';


export default function InvestmentSection() {
    const options: { icon: React.ElementType; title: string }[] = [
        { icon: Creditcard, title: "Quiero una tarjeta." },
        { icon: CashIcon, title: "Quiero un crédito." },
        { icon: PiggyBanckIcon, title: "Herramientas de ahorro" },
        { icon: ShieldCheckIcon, title: "Quiero un seguro" },
        { icon: PersonIcon, title: "Operadora de pensiones." },
        { icon: WalletIcon, title: "Métodos de inversión." },
    ];

    return (
        <div className="w-full lg:flex my-10">
            <div className='w-full lg:w-1/2'>
                <h1 className="text-myCustomColor-default mb-5 text-3xl">Contanos, ¿qué estás buscando?</h1>
                <div className="flex flex-wrap gap-16 justify-center">
                    {options.map((option, index) => (
                        <OptionCard key={index} icon={option.icon} title={option.title} />
                    ))}
                </div>
            </div>
            <div className='lg:flex w-full lg:w-1/2 lg:items-center bg-slate-50 lg:p-5 lg:gap-3 rounded-xl my-5'>
                <div className="w-full lg:w-1/2">
                    <Image
                        src={require("@/public/imgcel.png")}
                        width={200}
                        height={200}
                        alt='celular'
                        className="m-auto my-3"
                    />
                </div>
                <div className=" w-full lg:w-1/2 flex flex-col justify-between rounded-md">
                    <div className="flex flex-col justify-between gap-5">
                        <h1 className="text-2xl">Abrí una cuenta de ahorros con nosotros</h1>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>Organizá tu saldo con los sobres electrónicos</li>
                            <li>Disfrutá de beneficios y descuentos exclusivos con tu tarjeta</li>
                            <li>Tu dinero a la mano por medio de la app BCR Móvil</li>
                        </ul>
                    </div>
                    <PrimaryButton label="Quiero una cuenta" extendClassName="w-full m-auto my-4 rounded-md text-center" />
                </div>
            </div>
        </div>
    );
}