import Message from "@/modules/chat/components/Message";
import MessageInput from "@/modules/chat/components/MessageInput";
import TopBar from "@/modules/chat/components/TopBar";
import socketClient from "@/global/socketClient";
import { useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { useLogout } from "@/modules/auth/hooks/useLogout";
import useMessages from "@/modules/chat/hooks/useMessages";
import type { IMessage } from "../types/chat.interface";
import moment from "moment";

const ChatRoom: React.FC = () => {
  const { logout } = useLogout();
  const { roomId } = useParams<{ roomId: string }>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { data: messagesData, isLoading, error } = useMessages(roomId as string);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socketClient.emit("join", { name: "User", roomId });

    if (messagesData) {
      setMessages(messagesData);
    }

    socketClient.on("sendMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketClient.off("sendMessage");
    };
  }, [roomId, messagesData]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleLogout = () => {
    logout();
  };

  // Group messages by date for date separators
  const getDateLabel = (dateStr: string) => {
    const msgDate = moment(dateStr);
    const today = moment().startOf("day");
    const yesterday = moment().subtract(1, "day").startOf("day");

    if (msgDate.isSame(today, "day")) {
      return `Today, ${msgDate.format("h:mm a")}`;
    }
    if (msgDate.isSame(yesterday, "day")) {
      return `Yesterday, ${msgDate.format("h:mm a")}`;
    }
    return msgDate.format("MMM D, h:mm a");
  };

  // Determine whether to show a date separator above a message
  const shouldShowDateSeparator = (index: number) => {
    if (index === 0) return true;
    const prevDate = moment(messages[index - 1].createdAt).startOf("day");
    const currDate = moment(messages[index].createdAt).startOf("day");
    return !prevDate.isSame(currDate, "day");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-[#1a1a1a]">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-700 border-t-gray-400" />
          <span className="text-gray-500 text-sm font-medium">Loading messages...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-[#1a1a1a]">
        <div className="text-red-400 p-6 text-center bg-red-500/5 rounded-2xl border border-red-500/10 max-w-sm">
          <p className="font-semibold mb-1">Something went wrong</p>
          <p className="text-sm text-red-400/70">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#1a1a1a]">
      <TopBar roomId={roomId as string} onLogout={handleLogout} />

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto">
          {messages?.map((msg, index) => (
            <React.Fragment key={index}>
              {/* Date separator */}
              {shouldShowDateSeparator(index) && (
                <div className="flex items-center justify-center my-6">
                  <span className="text-[11px] font-semibold text-gray-600 bg-[#252525] px-4 py-1.5 rounded-full">
                    {getDateLabel(msg.createdAt)}
                  </span>
                </div>
              )}
              <Message message={msg} />
            </React.Fragment>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <MessageInput roomId={roomId as string} />
    </div>
  );
};

export default ChatRoom;