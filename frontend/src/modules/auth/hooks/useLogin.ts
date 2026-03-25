import { useMutation } from "@tanstack/react-query";
import AuthService from "../services/auth.service";
import { useAuth } from "../../../global/store/useAuth";


export const useLogin = () => {

    const { setAccessToken, setUser } = useAuth();

    const { mutate: login, isPending } = useMutation({
        mutationFn: (userData: any) => AuthService.login(userData),
        onSuccess: (response) => {
            console.log("response", response);

            const { access_token } = response;
            setAccessToken(access_token);
            AuthService.getUserInfo().then((user) => {
                setUser(user);

            }).catch((error) => {
                console.error("Failed to fetch user info during login", error);
            });

        },

    });

    return { login, isPending };
};
