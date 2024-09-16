import axios from 'axios';

const transfer_url = "http://127.0.0.1:8000/api/generar_transferencia";

interface dataTransfer {
  monto: string;
  num_cuenta: string;
  id_user: string;
}

export default async function transfer_services(data: dataTransfer, token: string) {
  try {
    const response = await axios.post(
      transfer_url,
      {
        monto: data.monto,
        id_user: data.id_user,
        num_cuenta: data.num_cuenta,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.errors) {
      return { error: response.data.errors };
    }

    if (response.data.message && response.data.user) {
      return { message: response.data.message , user : response.data.user};
    }

    console.log(response.data)
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;
      console.error(`Error ${status}:`, data);

      if (data.errors) {
        return { error: data.errors }; 
      }

      return { error: "Error en la transferencia", details: data };
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor", error.request);
      return { error: "No se recibió respuesta del servidor" };
    } else {
      console.error("Error", error.message);
      return { error: error.message };
    }
  }
}