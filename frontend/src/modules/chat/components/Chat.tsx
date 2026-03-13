import Message, { type IMessage } from "@/modules/chat/components/Message";
import MessageInput from "@/modules/chat/components/MessageInput";
import TopBar from "@components/TopBar";
import apiClient from "@/global/apiClient";
import socketClient from "@/global/socketClient";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useLogout } from "@/modules/auth/hooks/useLogout";

const ChatRoom: React.FC = () => {
  const { logout } = useLogout();
  const { roomId } = useParams<{ roomId: string }>();
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await apiClient.get(`/messages/${roomId}`);
        setMessages(response.data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
        message.error("Failed to fetch messages");
      }
    };

    fetchMessages();
  }, [roomId]);

  useEffect(() => {
    socketClient.emit("join", { name: "User", roomId });

    socketClient.on("message", (message) => {
      console.log("hey new message received", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketClient.off("message");
    };
  }, [roomId]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-800 text-white">
      <TopBar roomId={roomId as string} onLogout={handleLogout} />
      <div className="flex-1 overflow-auto p-4">
        {messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
      </div>
      <MessageInput roomId={roomId as string} />
    </div>
  );
};

export default ChatRoom;