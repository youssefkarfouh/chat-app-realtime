import { useQuery } from "@tanstack/react-query";
import ChatService from "../services/chat.services";

const useMessages = (roomId: string) => {
    return useQuery({
        queryKey: ["messages", roomId],
        queryFn: () => ChatService.getMessages(roomId),
    });
};

export default useMessages;