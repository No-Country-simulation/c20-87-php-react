import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Popover, PopoverTrigger, PopoverContent, Switch } from '@nextui-org/react';
import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ClipBoard from "@/public/imgs/Clipboard";

export default function CardStatement() {
    const user = useSelector((state: RootState) => state.auth.user[0]);
    const [hideDetails, setHideDetails] = useState(false);

    const toggleDetails = (isChecked:any) => {
        setHideDetails(isChecked); 
    };

    const maskData = (data:any) => {
        return data ? '*'.repeat(data.length) : '';
    };

    return (
        <Card className="max-w-[300px] p-1">
            <CardHeader className="w-full flex justify-evenly items-center gap-3">
                <h1>Cuenta única</h1>
                <Switch 
                  size="sm" 
                  onChange={(e) => toggleDetails(e.target.checked)}
                  >
                  Ocultar
                </Switch>
            </CardHeader>
            <Divider/>
            <CardBody>
                <div className="p-3 gap-3 flex flex-col justify-evenly text-lg">
                    <h1>Mi N°: {hideDetails ? maskData(user?.number_accoun) : user?.number_accoun}</h1>
                    <h1>Mi saldo: $ {hideDetails ? maskData(user?.balance) : user?.balance}</h1>
                </div>
            </CardBody>
            <Divider/>
            <CardFooter>
                <div className="flex w-full justify-evenly gap-2">
                    <Button variant="bordered">Ver Movimientos</Button>
                    <Popover placement="bottom" showArrow={true} color="foreground">
                        <PopoverTrigger>
                            <Button variant="bordered"><ClipBoard width={20} height={20}/>CBU/Alias</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="px-1 py-2">
                                <div className="text-small">Copiado!</div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </CardFooter>
        </Card>
    );
}