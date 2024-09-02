import api from '../utils/api';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useMessage from "./useMessage";

export default function useAuth() {
    const [authenticating, setAuthenticating] = useState(false);
    const { message } = useMessage();
    const history = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticating(true)
        }
    }, []);

    async function register(user) {
        let msg = 'Registration successful.'
        let type = 'success'
        try {
            const data = await api.post('/users/register', user)
                .then((response) => {
                    return response.data;
                });
            await authenticationUser(data)
        } catch (error) {
            msg =  error.response.data.message
            type = 'error'
        }

        message(msg, type)
    }

    async function authenticationUser(data) {
        setAuthenticating(true);
        localStorage.setItem('token', JSON.stringify(data.token));
        history('/')
    }

    function logout() {
        setAuthenticating(false);
        localStorage.removeItem('token');
        api.defaults.headers.Authorization = undefined;
        history('/')

        let message1 = 'Logout successful.';
        let type = 'success';
        message(message1, type);
    }

    return { authenticating, register, logout };
}