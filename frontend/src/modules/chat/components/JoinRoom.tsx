import socketClient from "@/global/socketClient";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FaUser, FaDoorOpen, FaComments, FaUsers } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useRooms } from "../hooks/useRooms";
import type { IRoom } from "../types/chat.interface";
import { useJoinRoom } from "../hooks/useJoinRoom";


const JoinRoom: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<{
    name: string;
    roomId: string;
  }>({
    defaultValues: {
      name: "",
      roomId: "",
    },
  });
  const [name, setName] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const navigate = useNavigate();
  const { data: rooms } = useRooms();
  const { mutate: joinRoom } = useJoinRoom();


  const handleJoinRoom = () => {
    joinRoom(selectedRoomId);
    socketClient.emit("join", { name, roomId: selectedRoomId });
    localStorage.setItem("username", name);
    navigate(`/chats/${selectedRoomId}`);


  };

  // const createRoom = async () => {
  //   try {
  //     const response = await apiClient.post("/rooms", { roomName: `Room ${rooms.length + 1}` });
  //     if (response.data) {
  //       message.success("Room created successfully");
  //       console.log("response.data" , response.data);

  //       setRooms((prevRooms) => [...prevRooms, response.data]);

  //     }
  //   } catch (error) {
  //     console.error("Error creating room:", error);
  //   }
  // }

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
                {/* Name input */}
                <div className="group">
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6633cc] transition-colors">
                      <FaUser />
                    </span>
                    <input
                      type="text"
                      autoComplete="on"
                      placeholder="Your display name"
                      className="w-full bg-[#f8f8f8] border-none py-4 pl-14 pr-5 text-base focus:ring-0 focus:bg-[#f0f0f0] outline-none transition-all"
                      {...register('name', {
                        required: 'Name is required.',
                      })}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>}
                  </div>
                </div>

                {/* Room select */}
                <div className="group">
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6633cc] transition-colors">
                      <FaDoorOpen />
                    </span>
                    <select
                      {...register('roomId', {
                        required: 'Room is required.',
                      })}
                      key={selectedRoomId}
                      className="w-full bg-[#f8f8f8] border-none py-4 pl-14 pr-5 text-base focus:ring-0 focus:bg-[#f0f0f0] outline-none transition-all appearance-none cursor-pointer"
                      onChange={(e) => setSelectedRoomId(e.target.value)}
                    >
                      <option value="" disabled>
                        Select a Room
                      </option>
                      {rooms?.map((room: IRoom) => (
                        <option key={room._id} value={room._id}>
                          {room.name}
                        </option>
                      ))}
                    </select>
                    {errors.roomId && <p className="text-red-500 text-sm mt-2">{errors.roomId.message}</p>}
                    {/* Dropdown arrow */}
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
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