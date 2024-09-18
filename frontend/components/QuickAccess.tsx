"use client"
import React, { useState } from 'react';
import { Card } from '@nextui-org/react'
import Transfer from './Pagos/Transfer';
import PiggyBanckIcon from '@/public/imgs/PiggyBanckIcon';
import CashIcon from '@/public/imgs/CashIcon';
import CreditCard from '@/public/imgs/CreditCard';
import WalletIcon from '@/public/imgs/WalletIcon';
import TransferIcon from '@/public/imgs/TransferIcon';


export const QuickAccess = () => {

  const [ isOpen , setIsOpen] = useState(false)
  
  const handleModalOpen = () =>{
    setIsOpen(true)
  }

  return (
    <div className="gap-5 grid grid-cols-2 lg:grid-cols-3">

      <Card className="cursor-pointer flex items-center justify-center p-4" onPress={handleModalOpen} isPressable={true}>
        <div className="flex flex-col justify-center items-center gap-3">
          <TransferIcon width={40} height={40}/>
          <p>Transferencias</p>
        </div>
      </Card>

      <Card className="cursor-pointer flex items-center justify-center p-4" isPressable={true}>
        <div className="flex flex-col justify-center items-center gap-3">
          <CashIcon width={40} height={40}/>
          <p>Pagos</p>
        </div>
      </Card>

      <Card className="cursor-pointer flex items-center justify-center p-4" isPressable={true}>
        <div className="flex flex-col justify-center items-center gap-3">
          <PiggyBanckIcon width={40} height={40}/>
          <p>Ahorro</p>
        </div>
      </Card>

      <Card className="cursor-pointer flex items-center justify-center p-4" isPressable={true}>
        <div className="flex flex-col justify-center items-center gap-3">
          <CreditCard width={40} height={40}/>
          <p>Creditos</p>
        </div>
      </Card>

      <Card className="cursor-pointer flex items-center justify-center p-4" isPressable={true}>
        <div className="flex flex-col justify-center items-center gap-3">
          <WalletIcon width={40} height={40}/>
          <p>Inversion</p>
        </div>
      </Card>

      <Card className="cursor-pointer flex items-center justify-center p-4" isPressable={true}>
        <div className="flex flex-col justify-center items-center gap-3">
          <TransferIcon width={40} height={40}/>
          <p>Transferencias</p>
        </div>
      </Card>

      <Transfer isOpen={isOpen} setIsOpen={setIsOpen}/>
  </div>
  );
};
