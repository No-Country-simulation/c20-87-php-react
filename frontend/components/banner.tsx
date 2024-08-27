import Link from "next/link"

export const Banner = () => {

    return (
        <>
            <div className="w-full h-64 flex items-center justify-between p-20">
                <div className="w-1/2">
                    <h1 className="text-6xl mb-6">¡No dejes pasar esta oportunidad!</h1>
                    <p className="text-2xl mb-12"> Puedes cumplir tus sueños de tener tu casa propia, adquirir un vehículo y/o empezar un negocio con nuestros Bienes Adjudicados.</p>
                    <Link href="#">
                        <button className="w-2/3 h-10 bg-green-800 border-green-800 text-white rounded">Consulta sobre tus Bienes &rarr;</button>
                    </Link>
                </div>
                <div>
                    <img src="https://www.ultracreditos.com/app/images/logos-bancos/logo-bmsc-wide-500.png" alt="banner" 
                        className="w-100 h-100 rounded-3xl"></img>
                </div>
            </div>
        </>
    )
}