"use client"
import { Button } from 'antd'
import Link from 'next/link'
import { useState } from 'react'

interface Props {
    num: number
}
export const Banner = ({num}: Props) => {

    

    const [count, setCount] = useState(num)

    return (
        <>
            <div className="w-full h-64 bg-gray-200">
                <h1>Titulo</h1>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Quaerat sunt ad voluptatum quasi itaque sed nobis doloremque distinctio,
                    assumenda harum quidem officiis iusto, fugiat, aperiam enim dicta tempora
                    facilis. Repellat?</p>
                <Link href="/login">
                    <Button type="primary">Login</Button>
                </Link>
            </div>
            <p>Contador: {count}</p>
            <button onClick={() => setCount(count + 1)}>+</button>
        </>
    )
}