import axiosInstance from "../../../global/apiClient";

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

const AuthService = {
    register: async (userData: RegisterData) => {
        return await axiosInstance.post('/signup', userData);
    },

    login: async (userData: any) => {
        return await axiosInstance.post('/signin', userData);
    },

    logout: async () => {
        return await axiosInstance.post('/signout');
    }
};

export default AuthService;
