import Message from "@/modules/chat/components/Message";
import MessageInput from "@/modules/chat/components/MessageInput";
import TopBar from "@/modules/chat/components/TopBar";
import socketClient from "@/global/socketClient";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useLogout } from "@/modules/auth/hooks/useLogout";
import useMessages from "@/modules/chat/hooks/useMessages";
import type { IMessage } from "../types/chat.interface";


const ChatRoom: React.FC = () => {
  const { logout } = useLogout();
  const { roomId } = useParams<{ roomId: string }>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { data: messagesData, isLoading, error } = useMessages(roomId as string);


  useEffect(() => {
    socketClient.emit("join", { name: "User", roomId });

    if (messagesData) {
      console.log("messagesData", messagesData);
      setMessages(messagesData);
    }

    socketClient.on("sendMessage", (message) => {
      console.log("hey new message received", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketClient.off("sendMessage");
    };
  }, [roomId, messagesData]);




  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col h-full bg-gray-800 text-white">
      <TopBar roomId={roomId as string} onLogout={handleLogout} />
      <div className="flex-1 overflow-auto p-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          messages?.map((msg, index) => (
            <Message key={index} message={msg} />
          ))
        )}
      </div>
      <MessageInput roomId={roomId as string} />
    </div>
  );
};

export default ChatRoom;