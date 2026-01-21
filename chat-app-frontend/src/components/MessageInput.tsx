import socketClient from "@/global/socketClient";
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";

const MessageInput: React.FC<{ roomId: string }> = ({ roomId }) => {
  const [text, setText] = useState("");
  const [username] = useState<string | null>(() =>
    localStorage.getItem("username")
  );

  const handleSendMessage = () => {
    if (text && username) {
      socketClient.emit("message", {
        roomId,
        senderId: socketClient.id,
        username,
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
    <div className="py-4 px-6 bg-gray-700 flex">
      <input
        type="text"
        className="flex-1 py-2 px-4 rounded bg-gray-600 text-white"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSendMessage}
        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded ml-2"
      >
        <IoSend />
      </button>
    </div>
  );
};

export default MessageInput;