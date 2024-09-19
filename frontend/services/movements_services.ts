import axios from 'axios';

const transfer_url = "http://127.0.0.1:8000/api/transactions";

export default async function movements_services(token: string) {
  try {
    const response = await axios.get(
      transfer_url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data[0]['amount'])
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;
      console.error(`Error ${status}:`, data);

      if (data.errors) {
        return { error: data.errors }; 
      }

      return { error: "Error en el movimiento", details: data };
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor", error.request);
      return { error: "No se recibió respuesta del servidor" };
    } else {
      console.error("Error", error.message);
      return { error: error.message };
    }
  }
}