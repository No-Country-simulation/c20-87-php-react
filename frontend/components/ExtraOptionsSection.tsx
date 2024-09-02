import Image from 'next/image'
import React from 'react'

const image1 = 'https://www.bancobcr.com/wps/wcm/connect/bcr/40d327a4-8d08-44b9-aa94-d0e76f1120ab/Tutoriales.webp?MOD=AJPERES&CACHEID=ROOTWORKSPACE.Z18_4024H1S0NGVK20QQVEVDPP1G52-40d327a4-8d08-44b9-aa94-d0e76f1120ab-oYmP4aW'
const image2 = 'https://www.bancobcr.com/wps/wcm/connect/bcr/f09c20d8-fca6-42a5-8c19-0cbd443b5842/MediosDePago.webp?MOD=AJPERES&CACHEID=ROOTWORKSPACE.Z18_4024H1S0NGVK20QQVEVDPP1G52-f09c20d8-fca6-42a5-8c19-0cbd443b5842-oYmP4aW'
const image3 = 'https://www.bancobcr.com/wps/wcm/connect/bcr/77a04362-c947-4e3f-9471-2f024934d584/Indice.webp?MOD=AJPERES&CACHEID=ROOTWORKSPACE.Z18_4024H1S0NGVK20QQVEVDPP1G52-77a04362-c947-4e3f-9471-2f024934d584-oYmP4aW'

export const ExtraOptionsSection = () => {
  return (
    <div className='flex flex-col sm:flex-row text-center text-blue-800 cursor-pointer my-10'>
      <div className=' p-2 h-32 sm:h-48 w-full sm:w-1/3 mb-10'>
        <Image 
          src={image1}
          alt="Image1" 
          width={400} 
          height={200} 
          className='rounded-3xl object-cover w-full h-full'
        />
        <p className='mt-2'>Tutoriales</p>
      </div>
      <div className='p-2 h-32 sm:h-48 w-full sm:w-1/3 mb-10'>
        <Image 
          src={image2}
          alt="Image2" 
          width={400} 
          height={200} 
          className='rounded-3xl object-cover w-full h-full'
        />
        <p className='mt-2'>Comparador de Medios de Pago</p>
      </div>
      <div className='p-2 h-32 sm:h-48 w-full sm:w-1/3 mb-10'>
        <Image 
          src={image3}
          alt="Image3"  
          width={400} 
          height={200} 
          className='rounded-3xl object-cover w-full h-full'
        />
        <p className='mt-2'>Indice de Comparabilidad Financiera</p>
      </div>
    </div>
  )
}
