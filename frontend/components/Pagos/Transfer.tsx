'use client'
import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Card, CardBody, Tabs ,Tab } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import { RootState } from "@/store/store";
import transfer_services from "@/services/transfer_services";

interface PropsTransfer {
    monto: string;
    num_cuenta: string;
}

interface TransferProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export default function Transfer({ isOpen, setIsOpen }: TransferProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm<PropsTransfer>();

    const user = useSelector((state: RootState) => state.auth.user[0]);
    const AUTH_TOKEN = useSelector((state: RootState) => state.auth.token);
    console.log(user)

    useEffect(() => {
        if (isOpen) {
            setSuccessMessage(null);
            setErrorMessage(null);
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsOpen(false);
        reset();
    };

    const SubmitData = async (data: PropsTransfer) => {
        setIsLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const response = await transfer_services({ ...data, id_user: user.id }, AUTH_TOKEN || "");

            console.log(response)

            if (response.message) {
                setSuccessMessage(response.message);
            } else if (response.error) {
                setErrorMessage(response.error);
            }

            setTimeout(() => {
                handleClose();
                setIsLoading(false);
            }, 2000);


        } catch (error: any) {
            console.error("Error en la transferencia:", error);
            setErrorMessage(error.response?.data?.message || "Ocurrió un error durante la transferencia.");
            setIsLoading(false);
        }
    };

    const userAccountNumber = "123456"

    return (
        <>
            <Modal isOpen={isOpen} onClose={handleClose} placement="top-center">
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1">Transferencia</ModalHeader>
                        <ModalBody>
                            <form className="flex flex-col gap-3" onSubmit={handleSubmit(SubmitData)}>
                                <Button isDisabled >
                                    Saldo disponible : {user.balance} ARS
                                </Button>
                                <div>
                                    <Input
                                        {...register("num_cuenta",
                                            {
                                                required: "El número de cuenta es obligatorio",
                                                validate: (value) => value !== userAccountNumber || "No puedes transferirte dinero a ti mismo"
                                            }
                                        )}
                                        name="num_cuenta"
                                        autoFocus
                                        label="Número de cuenta"
                                        placeholder=""
                                        variant="bordered"
                                    />
                                    {errors.num_cuenta &&
                                        <Card className="bg-red-100 my-2">
                                            <CardBody>
                                                <p className="text-red-500">{errors.num_cuenta?.message}</p>
                                            </CardBody>
                                        </Card>
                                    }
                                </div>
                                <div>
                                    <Input
                                        {...register("monto", { required: "El monto es obligatorio" })}
                                        name="monto"
                                        label="Monto"
                                        placeholder=""
                                        type="text"
                                        variant="bordered"
                                    />
                                    {errors.monto &&
                                        <Card className="bg-red-100 my-2">
                                            <CardBody>
                                                <p className="text-red-500">{errors.monto.message}</p>
                                            </CardBody>
                                        </Card>
                                    }
                                </div>

                                {successMessage && (
                                    <Card className="bg-green-100">
                                        <CardBody>
                                            <p className="text-green-500">{successMessage}</p>
                                        </CardBody>
                                    </Card>
                                )}

                                {errorMessage && (
                                    <Card className="bg-red-100">
                                        <CardBody>
                                            <p className="text-red-500">{errorMessage}</p>
                                        </CardBody>
                                    </Card>
                                )}

                                <ModalFooter>
                                    <Button color="primary" type="submit" disabled={isLoading}>
                                        {isLoading ? "Enviando..." : "Transferir"}
                                    </Button>
                                    <Button color="danger" variant="flat" onPress={handleClose} disabled={isLoading}>
                                        Cancelar
                                    </Button>
                                </ModalFooter>
                            </form>
                        </ModalBody>
                    </>
                </ModalContent>
            </Modal>
        </>
    );
}