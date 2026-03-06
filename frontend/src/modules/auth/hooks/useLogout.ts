import { useMutation } from "@tanstack/react-query";
import AuthService from "../services/auth.service";
import { useAuth } from "../../../store/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const navigate = useNavigate();
    const { setUser, setAccessToken, setIsAuthenticated } = useAuth();

    const { mutate: logout, isPending } = useMutation({
        mutationFn: () => AuthService.logout(),
        onSettled: () => {
            setUser(null);
            setAccessToken(null);
            setIsAuthenticated(false);
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
