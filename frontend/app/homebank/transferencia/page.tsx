'use client'
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Card, CardBody } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import transfer_services from "@/services/transfer_services";
import { RootState } from "@/store/store";

interface PropsTransfer {
  monto: string;
  num_cuenta: string;
}

export default function Transfer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); 

  const { register, handleSubmit, formState: { errors }, reset } = useForm<PropsTransfer>();

  const user = useSelector((state: RootState) => state.auth.user[0]);
  const AUTH_TOKEN = useSelector((state: RootState) => state.auth.token);

  const handleOpen = () => {
    setIsOpen(true);
    setSuccessMessage(null); 
  };
  const handleClose = () => {
    setIsOpen(false);
    reset(); 
  };

  const SubmitData = async (data: PropsTransfer) => {
    setIsLoading(true);
    try {
      await transfer_services({ ...data, id_user: user.id }, AUTH_TOKEN || "");
      setSuccessMessage("Transferencia realizada con éxito.");
      setTimeout(() => {
        handleClose();
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error en la transferencia:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onPress={handleOpen} color="primary">Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        placement="top-center"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Transferencia</ModalHeader>
            <ModalBody>
              <form className="flex flex-col gap-3" onSubmit={handleSubmit(SubmitData)}>
                <div>
                  <Input
                    {...register("num_cuenta", { required: "El número de cuenta es obligatorio" })}
                    name="num_cuenta"
                    autoFocus
                    label="Número de cuenta"
                    placeholder=""
                    variant="bordered"
                  />
                  {errors.num_cuenta && <span>{errors.num_cuenta.message}</span>}
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
                  {errors.monto && <span>{errors.monto.message}</span>}
                </div>

                {successMessage &&
                  <Card className="bg-green-100">
                    <CardBody>
                      <p>{successMessage}</p>
                    </CardBody>
                  </Card>
                }
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