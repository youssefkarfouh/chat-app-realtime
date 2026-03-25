import { IoVideocamOutline } from "react-icons/io5";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";

const TopBar: React.FC<{ roomId: string; onLogout: () => void }> = ({
  roomId,
  onLogout,
}) => {
  const avatarUrl = `https://ui-avatars.com/api/?name=${roomId.toUpperCase()}&background=3a3a3a&color=fff&bold=true`;

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-[#1e1e1e] border-b border-white/5 shrink-0">
      {/* Left: Avatar + Room Info + Online Status */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={avatarUrl}
            alt={roomId}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-white/10"
          />
          {/* Online indicator */}
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#1e1e1e]" />
        </div>
        <div>
          <h1 className="text-white text-base font-semibold tracking-tight leading-tight">
            {roomId}
          </h1>
          <span className="text-emerald-400 text-xs font-medium">Online</span>
        </div>
      </div>

      {/* Right: Action icons */}
      <div className="flex items-center gap-1">
        <button
          className="p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer border-none bg-transparent"
          title="Video call"
        >
          <IoVideocamOutline size={22} />
        </button>
        <button
          onClick={onLogout}
          className="p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer border-none bg-transparent"
          title="Add participant"
        >
          <MdOutlinePersonAddAlt1 size={22} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;