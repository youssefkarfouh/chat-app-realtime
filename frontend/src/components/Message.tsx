import moment from "moment";

export interface IMessage {
  username: string;
  sender: string;
  createdAt: string;
  text: string;
}

const Message: React.FC<{ message: IMessage }> = ({ message }) => {
  const avatarUrl = `https://ui-avatars.com/api/?name=${message.username.toUpperCase()}&background=random`;

  return (
    <div className="flex items-start mb-6">
      <div className="shrink-0 mr-4">
        <img
          src={avatarUrl}
          alt={message.sender}
          width={45}
          height={45}
          className="rounded-full"
        />
      </div>
      {/* Message content */}
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-white">{message.username}</span>
          <span className="text-gray-400 text-xs">
            {moment(message.createdAt).format("DD MMM YYYY, h:mm A")}
          </span>
        </div>
        <p className="text-gray-300 -mt-0.5">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;