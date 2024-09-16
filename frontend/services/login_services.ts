import axios from 'axios';

export interface LoginProps {
    username: string;
    password: string;
}

export default async function login_services({ username, password }: LoginProps) {
    try {
        await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', { withCredentials: true });

        const cookies = document.cookie
            .split('; ')
            .find(row => row.startsWith('XSRF-TOKEN'))
            ?.split('=')[1];

        console.log("Token CSRF:", cookies);

        const response = await axios.post("http://127.0.0.1:8000/api/login_user", {
            username: username,
            password: password
        }, {
            withCredentials: true,
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
        },
        );

        // console.log('Login exitoso, datos del servidor:', response.data);

        return response.data;
    } catch (error) {
        if (error) {
            console.error('Error de respuesta del servidor:', error);
        } else {
            console.error('Error al iniciar sesión:', error);
        }
        throw error;
    }
}