import socketClient from "@/global/socketClient";
import { useNavigate } from "react-router-dom";
import React from "react";
import { FaComments, FaUsers } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import { useRooms } from "../hooks/useRooms";
import { useJoinRoom } from "../hooks/useJoinRoom";
import { Select } from "antd";


const JoinRoom: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<{
    roomId: string;
  }>({
    defaultValues: {
      roomId: "",
    },
  });

  const navigate = useNavigate();
  const { data: rooms } = useRooms();
  const { mutate: joinRoom } = useJoinRoom();

  const options = rooms?.map((room) => ({
    value: room._id,
    label: room.name,
  }));


  const handleJoinRoom = ({ roomId }: { roomId: string }) => {
    console.log("roomId", roomId);
    joinRoom(roomId);
    socketClient.emit("join", { roomId: roomId });

    navigate(`/chats/${roomId}`);


  };



  return (
    <div className="h-full bg-[#f6f5f7] text-[#333] flex flex-col">
      <div className="flex-1 w-full flex flex-col md:flex-row bg-white overflow-hidden">

        {/* Left Side: Purple Panel */}
        <div className="md:w-[40%] bg-linear-to-r from-[#6633cc] to-[#5c33a3] text-white flex flex-col items-center justify-center p-12 text-center order-2 md:order-1 relative min-h-[40vh] md:h-full">


          <div className="max-w-[420px]">
            <h2 className="text-5xl font-extrabold mb-8 tracking-tight">Join the Conversation!</h2>
            <p className="text-base leading-relaxed mb-12 opacity-80">
              Pick a room, choose your name, and start chatting with others in real time.
            </p>
            <div className="flex items-center justify-center gap-8 mt-4">
              <div className="flex flex-col items-center gap-2 opacity-70">
                <FaUsers size={28} />
                <span className="text-sm font-medium">{rooms?.length} Rooms</span>
              </div>
              <div className="w-px h-12 bg-white/30"></div>
              <div className="flex flex-col items-center gap-2 opacity-70">
                <FaComments size={28} />
                <span className="text-sm font-medium">Real-time</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Join Form (White) */}
        <div className="md:w-[60%] bg-white flex flex-col items-center justify-center order-1 md:order-2 min-h-[60vh] md:h-full">
          <div className="w-full max-w-[420px] flex flex-col items-center">
            <h1 className="text-5xl font-black text-[#6633cc] mb-10 tracking-tight">Join Room</h1>

            <p className="text-sm text-gray-400 mb-10 tracking-wide">enter your name and select a room</p>

            <div className="w-full space-y-6">
              <form onSubmit={handleSubmit(handleJoinRoom)}>


                {/* Room select */}
                <div className="group">
                  <div className="relative">
                    <Controller

                      name="roomId"
                      control={control}
                      rules={{ required: 'Room is required.' }}
                      render={({ field }) => (
                        <Select
                          style={{ width: "100%" }}
                          value={field.value || undefined}
                          onChange={(value) => {
                            field.onChange(value);

                          }}
                          showSearch
                          placeholder="Select a room"
                          className="w-full bg-[#f8f8f8] border-none py-4 pl-14 pr-5 text-base focus:ring-0 focus:bg-[#f0f0f0] outline-none transition-all"
                          options={options}
                        />
                      )}
                    />
                    {errors.roomId && <p className="text-red-500 text-sm mt-2">{errors.roomId.message}</p>}
                  </div>
                </div>

                {/* Join Button */}
                <div className="flex justify-center pt-8">
                  <button
                    className="bg-[#6633cc] cursor-pointer text-white px-20 py-4 text-sm font-black uppercase tracking-[0.2em] transition-all hover:bg-[#5c33a3] hover:translate-y-[-2px] active:translate-y-0"
                  >
                    Join Room
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default JoinRoom;