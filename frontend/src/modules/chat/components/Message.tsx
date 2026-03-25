import moment from "moment";
import type { IMessage } from "../types/chat.interface";
import { useAuth } from "@/global/store/useAuth";

const Message: React.FC<{ message: IMessage }> = ({ message }) => {
  const { user } = useAuth();
  const isMe = message.username === user?.username;
  const avatarUrl = `https://ui-avatars.com/api/?name=${message.username.toUpperCase()}&background=3a3a3a&color=fff&bold=true`;

  return (
    <div
      className={`flex items-end mb-5 gap-3 ${
        isMe ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar — only for received messages */}
      {!isMe && (
        <div className="shrink-0">
          <img
            src={avatarUrl}
            alt={message.username}
            width={38}
            height={38}
            className="rounded-full ring-2 ring-white/5"
          />
        </div>
      )}

      <div
        className={`flex flex-col max-w-[70%] ${
          isMe ? "items-end" : "items-start"
        }`}
      >
        {/* Username — only for received messages */}
        {!isMe && (
          <span className="text-[11px] font-semibold text-gray-500 ml-1 mb-1.5 tracking-wide">
            {message.username}
          </span>
        )}

        {/* Message bubble */}
        <div
          className={`relative px-5 py-3 shadow-lg transition-all duration-200 ${
            isMe
              ? "bg-[#383838] text-white rounded-[20px] rounded-br-[6px]"
              : "bg-[#2a2a2a] text-gray-100 rounded-[20px] rounded-bl-[6px]"
          }`}
        >
          <p className="text-[14px] leading-relaxed font-medium m-0">
            {message.text}
          </p>
        </div>

        {/* Timestamp */}
        <span
          className={`text-[10px] mt-1.5 px-1 text-gray-600 font-medium ${
            isMe ? "text-right" : "text-left"
          }`}
        >
          {moment(message.createdAt).format("h:mm A")}
        </span>
      </div>
    </div>
  );
};

export default Message;