import api from './api';
import { history } from '../utils';

const refreshToken = () => {
    return api.get('/authentication/refreshToken');
};

const login = async (username: string, password: string) => {
    const response: any = await api.post('/authentication/login', {
        username,
        password,
    });
    return response;
};

const logout = async (fallBackUrl: string | null = '') => {
    try {
        await api.get('/authentication/logout');
        if (fallBackUrl?.trim() !== '') {
            history.navigate(`/dang-nhap?fallBackUrl=${fallBackUrl}`);
        } else {
            history.navigate(`/dang-nhap`);
        }
    } catch (error) {
        history.navigate(`/dang-nhap`);
    }
};

const getCurrentUser = async () => {
    return api.get('/user/me');
};

const AuthServices = {
    login,
    logout,
    getCurrentUser,
    refreshToken,
};

export default AuthServices;
