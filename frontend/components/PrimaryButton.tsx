import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'

interface PrimaryButtonProps {
    label : string
    href? : string
    extendClassName?: string
}

export default function PrimaryButton({label , href = "", extendClassName }:PrimaryButtonProps) {
  if (href) {
    return (
      <Link href={href} className={`bg-blue-900 p-2 shadow-lg text-white ${extendClassName}`}>
        {label}
      </Link>
    )
  }

  return (
    <Button type="primary" htmlType="submit" className={`bg-blue-900 p-2 shadow-lg text-white ${extendClassName}`}>
      {label}
    </Button>
  )
}