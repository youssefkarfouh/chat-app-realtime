import { useMutation } from "@tanstack/react-query";
import AuthService from "../services/auth.service";
import { useAuth } from "../../../store/useAuth";

import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const navigate = useNavigate();
    const { setUser, setAccessToken, setIsAuthenticated } = useAuth();

    const { mutate: login, isPending } = useMutation({
        mutationFn: (userData: any) => AuthService.login(userData),
        onSuccess: (response) => {
            const { user, accessToken } = response.data;
            setUser(user);
            setAccessToken(accessToken);
            setIsAuthenticated(true);


            navigate("/");
        },

    });

    return { login, isPending };
};
