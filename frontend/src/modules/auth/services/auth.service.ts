import axiosInstance from "../../../global/apiClient";

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

const AuthService = {
    register: async (userData: RegisterData) => {
        const { data } = await axiosInstance.post('/register', userData);
        return data;
    },

    login: async (userData: any) => {
        const { data } = await axiosInstance.post('/login', userData);
        return data;
    },

    logout: async () => {
        const { data } = await axiosInstance.post('/logout');
        return data;
    },

    getUserInfo: async () => {
        const { data } = await axiosInstance.get('/userinfo');
        return data;
    }
};

export default AuthService;
