import axiosInstance from "../../../global/apiClient";
import type { IMessage } from "../types/chat.interface";


const ChatService = {


    getMessages: async (roomId: string) => {
        const { data } = await axiosInstance.get<IMessage[]>(`/messages/${roomId}`);

        return data;
    },

};

export default ChatService;
