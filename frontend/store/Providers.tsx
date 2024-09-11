'use client'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'

interface Props {
    children: React.ReactNode
}

export const Providers = ({ children }: Props) => {
    return (
        <div>
            <Provider store={store}>
                {children}
            </Provider>
        </div>
    )
}
