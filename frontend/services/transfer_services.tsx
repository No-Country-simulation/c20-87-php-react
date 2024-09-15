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
        num_cuenta: data.num_cuenta
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
