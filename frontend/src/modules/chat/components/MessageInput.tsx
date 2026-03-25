import socketClient from "@/global/socketClient";
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useAuth } from "@/global/store/useAuth";
import { BsEmojiSmile } from "react-icons/bs";
import { IoMdAttach } from "react-icons/io";
import { HiOutlinePhotograph } from "react-icons/hi";
import { MdOutlineCameraAlt } from "react-icons/md";

const MessageInput: React.FC<{ roomId: string }> = ({ roomId }) => {
  const [text, setText] = useState("");
  const { user } = useAuth();

  const handleSendMessage = () => {
    if (text && user) {
      socketClient.emit("sendMessage", {
        roomId,
        senderId: socketClient.id,
        username: user.username,
        text,
      });
      setText("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="px-5 py-4 bg-[#1e1e1e] border-t border-white/5 shrink-0">
      <div className="flex items-center gap-3 bg-[#2a2a2a] rounded-full px-4 py-2">
        {/* Emoji button */}
        <button className="text-gray-500 hover:text-gray-300 transition-colors p-1 cursor-pointer bg-transparent border-none shrink-0">
          <BsEmojiSmile size={20} />
        </button>

        {/* Input */}
        <input
          type="text"
          className="flex-1 bg-transparent border-none text-sm text-white py-2 px-1 outline-none placeholder:text-gray-600 font-medium"
          placeholder="Message........."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* Action icons */}
        <div className="flex items-center gap-1 shrink-0">
          <button className="text-gray-500 hover:text-gray-300 transition-colors p-1.5 cursor-pointer bg-transparent border-none">
            <IoMdAttach size={20} />
          </button>
          <button className="text-gray-500 hover:text-gray-300 transition-colors p-1.5 cursor-pointer bg-transparent border-none">
            <HiOutlinePhotograph size={20} />
          </button>
          <button className="text-gray-500 hover:text-gray-300 transition-colors p-1.5 cursor-pointer bg-transparent border-none">
            <MdOutlineCameraAlt size={20} />
          </button>
        </div>

        {/* Send / Mic button */}
        <button
          onClick={handleSendMessage}
          disabled={!text.trim()}
          className="bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white p-2.5 rounded-full transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer border-none shrink-0"
        >
          <IoSend size={16} className={text.trim() ? "translate-x-0.5" : ""} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;