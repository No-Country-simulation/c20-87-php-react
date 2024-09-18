'use client'
import { Card, CardBody, Button} from '@nextui-org/react'
import Image from 'next/image'
import bannerImagePortal from "@/public/bancoimg.png"

export const BannerFamily = () => {

  return (
    <Card className="lg:w-4/5 m-auto">
      <CardBody className="lg:flex lg:flex-row  gap-2">
        <div className="lg:w-1/2 flex flex-col gap-3 justify-center p-3">
          <h1 className="font-semibold">Brindale a tu familia la protección que necesitas.</h1>
          <p className="text-sm mb-2">Disfruta sin preocupaciones con tu Seguro de Vida Santander, tendras atencion medica las 24hrs.Pedilo 100% online.</p>
          <Button className="lg:w-1/2" color="primary">¡Lo quiero!</Button>
        </div>

        <div className="lg:w-1/2 flex items-center justify-center">
        <Image
            src={bannerImagePortal}
            width={290}
            height={290}
            alt="innovaImg"
          />
        </div>
      </CardBody>
    </Card>
  )
}