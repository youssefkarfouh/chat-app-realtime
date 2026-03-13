import { useMutation } from "@tanstack/react-query";
import AuthService from "../services/auth.service";
import { useAuth } from "../../../global/store/useAuth";

import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const navigate = useNavigate();
    const { setUser, setAccessToken } = useAuth();

    const { mutate: logout, isPending } = useMutation({
        mutationFn: () => AuthService.logout(),
        onSettled: () => {
            setUser(null);
            setAccessToken(null);

            navigate("/login");
        }
    });

    return { logout, isPending };
};
