import PrimaryButton from "./PrimaryButton"
import Image from 'next/image'

export const Banner = () => {

    return (
        <div className="flex flex-col lg:flex-row items-center bg-slate-50 p-3 rounded-md">
            <div className="flex w-full lg:w-1/2 flex-col">
                <div>
                    <h1 className="text-4xl text-center lg:text-start lg:text-6xl mb-6">¡Nueva Cuenta de Ahorro Rinde+!</h1>
                    <p className="text-xl text-center lg:text-start  font-light mb-12">Dale a tus ahorros la solidez y confianza que necesitan para crecer. Abre tu cuenta ahora y empieza a ganar con una tasa de interés de hasta el 3.75% anual sin límites.</p>
                </div>
                <PrimaryButton href="/" label="consulta sobre tus bienes" extendClassName="lg:w-1/2 flex justify-center rounded-md" />
            </div>

            <div className="w-full lg:w-1/2 flex justify-center items-center order-first lg:order-none">
                <Image alt="Picture of the author" src="https://backportal.bmsc.com.bo:1443/api/bmsc-cards/cards/3787/image/main" width={500} height={500} />
            </div>
        </div>
    )
}
