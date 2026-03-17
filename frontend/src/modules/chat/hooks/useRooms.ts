import apiClient from "@/global/apiClient";
import { useQuery } from "@tanstack/react-query";
import type { IRoom } from "../types/chat.interface";


export const useRooms = () => {
    return useQuery({
        queryKey: ["rooms"],
        queryFn: async () => {
            const response = await apiClient.get<IRoom[]>("/rooms");
            return response.data;
        },
    });
};