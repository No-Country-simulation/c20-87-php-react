import Link from 'next/link'
import React from 'react'

interface PrimaryButtonProps {
    label : string
    href? : string
    extendClassName?: string
}

export default function PrimaryButton({label , href = "", extendClassName }:PrimaryButtonProps) {
  return (
    <Link href={href} className={`bg-blue-900 p-2 shadow-lg ${extendClassName}`}>
      <h1 className="text-white">{label}</h1>
    </Link>
  )
}
