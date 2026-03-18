import { useMutation } from "@tanstack/react-query";
import apiClient from "@/global/apiClient";

export const useJoinRoom = () => {
    return useMutation({
        mutationFn: async (roomId: string) =>
            await apiClient.post('/join', { roomId }),
    });
};