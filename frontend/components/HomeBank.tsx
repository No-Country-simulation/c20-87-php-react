"use client"
import React, { useState } from 'react'
import CardStatement from "@/components/CardStatement"
import { QuickAccess } from './QuickAccess'
import { BannerFamily } from './BannerFamily'
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const HomeBank = () => {

  const user = useSelector((state: RootState) => state.auth.user[0]);

  return (
    <div className="px-12 lg:px-24 pb-10 mt-10 gap-3">
      <div className="lg:flex lg:justify-evenly mb-5">
        <div>
          <h1 className="font-semibold">Hola , {user?.name} {user?.lastname}</h1>
          <h4 className="text-lg font-light my-7">Estados de cuenta</h4>
          <CardStatement />
        </div>

        <div>
          <h4 className="text-lg font-light my-10">Accesos rápidos</h4>
          <QuickAccess />
        </div>
      </div>

      <BannerFamily />

    </div>
  )
}