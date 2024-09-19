import axios from 'axios';

const transfer_url = "http://127.0.0.1:8000/api/payservice";

interface dataTransferServices {
  user_id: string
  amount: string
  number_client:string
  service_id: string
}

export default async function payservices_services(data: dataTransferServices, token: string) {
  try {
    const response = await axios.post(
      transfer_url,
      {
        user_id: data.user_id,
        amount: data.amount,
        number_client : data.number_client,
        service_id : data.service_id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.error) {
      return { error: response.data.error };
    }

    if (response.data.message && response.data.user) {
      return { message: response.data.message , user : response.data.user};
    }

    return response.data;
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;
      console.error(`Error ${status}:`, data);

      if (data.error) {
        return { error: data.error }; 
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