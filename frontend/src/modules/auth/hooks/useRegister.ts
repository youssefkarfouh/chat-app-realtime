import { useMutation } from "@tanstack/react-query";
import AuthService from "../services/auth.service";
import type { RegisterData } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
    const navigate = useNavigate();

    const { mutate: register, isPending } = useMutation({
        mutationFn: (userData: RegisterData) => AuthService.register(userData),
        onSuccess: () => {
            navigate("/login");
        },
    });

    return { register, isPending };
};
