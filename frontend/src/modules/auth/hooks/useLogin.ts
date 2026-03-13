import { useMutation } from "@tanstack/react-query";
import AuthService from "../services/auth.service";
import { useAuth } from "../../../global/store/useAuth";

import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const navigate = useNavigate();
    const { setAccessToken, setUser } = useAuth();

    const { mutate: login, isPending } = useMutation({
        mutationFn: (userData: any) => AuthService.login(userData),
        onSuccess: (response) => {
            console.log("response", response);

            const { token } = response;
            setAccessToken(token);
            AuthService.getUserInfo().then((user) => {
                setUser(user);
                navigate('/', { replace: true });
            }).catch((error) => {
                console.error("Failed to fetch user info during login", error);
            });

        },

    });

    return { login, isPending };
};
