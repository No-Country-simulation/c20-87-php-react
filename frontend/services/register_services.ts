import axios from 'axios';

interface Props {
    username : string
    name : string
    lastname : string
    email: string,
    password :string
    phone_number : string
    type_user : number
}

export default async function register_services({ username, name ,  password , lastname , email , phone_number , type_user }: Props) {
    try {
        // await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', { withCredentials: true });

        // const cookies = document.cookie
        //     .split('; ')
        //     .find(row => row.startsWith('XSRF-TOKEN'))
        //     ?.split('=')[1];

        // console.log("Token CSRF:", cookies);

        const response = await axios.post("http://127.0.0.1:8000/api/crear_usuario", {
            username : username,
            name : name,
            lastname : lastname,
            email: email,
            password :password,
            phone_number : phone_number,
            type_user : type_user
        }, {
            withCredentials: true,
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
        },
        );

        return response.data;
    } catch (error) {
        if (error) {
            console.error('Error de respuesta del servidor:', error);
        } else {
            console.error('Error al registrarse:', error);
        }
        throw error;
    }
}