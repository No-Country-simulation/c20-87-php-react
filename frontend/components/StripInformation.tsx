import Image from 'next/image'
import React from 'react'
import Logo from "@/public/imglogobank.png"
import PrimaryButton from './PrimaryButton'

function StripInformation() {
    return (
        <div className="w-full flex-wrap bg-slate-50 lg:flex justify-center lg:justify-evenly my-5 p-3">

            <div className="w-[90%] items-center lg:w-[20%] flex justify-center ml-5">
                <Image
                    src={Logo}
                    alt="Picture of the author"
                    width={250}
                    height={250}
                    className="w-1/2 sm:w-1/2 md:w-1/2 lg:w-full lg:h-[100px] "
                />
            </div>

            <div className="w-[90%] lg:w-[20%] flex lg:justify-center ml-5 items-center my-5">
                <p className="text-center">Pasaportes, licencias, cédulas de residencia y más.</p>
            </div>

            <div className="w-[90%] lg:w-[20%] flex justify-center ml-5 items-center">
                <PrimaryButton label="Quiero una cita" extendClassName="h-10 rounded-md"/>
            </div>

        </div>
    )
}

export default StripInformation
