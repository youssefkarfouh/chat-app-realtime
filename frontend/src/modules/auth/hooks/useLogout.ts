import { useMutation } from "@tanstack/react-query";
import AuthService from "../services/auth.service";
import { useAuth } from "../../../global/store/useAuth";
import { toast } from "sonner";
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
        },
        onSuccess: () => {
            toast.success("Logged out successfully.");
        },
        onError: (error: any) => {
            console.error("Logout error:", error);
            toast.error("An error occurred during logout.");
        },
    });

    return { logout, isPending };
};
