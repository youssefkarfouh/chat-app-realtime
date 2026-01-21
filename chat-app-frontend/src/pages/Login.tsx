import apiClient from "@/global/apiClient";
import socketClient from "@/global/socketClient";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface Room {
  id: string;
  name: string;
}

const LoginPage: React.FC = () => {
  const [name, setName] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const navigate = useNavigate();

  const fetchRooms = async () => {
    try {
      const response = await apiClient.get("/rooms");
      if (!response.data) {
        throw new Error("Failed to fetch rooms");
      }
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleJoinRoom = () => {
    if (name && selectedRoomId) {
      socketClient.emit("join", { name, roomId: selectedRoomId });
      localStorage.setItem("username", name);
      navigate(`/chats/${selectedRoomId}`);
    }
    else{
      toast.error("Please enter your name and select a room");
    }
  };

  const createRoom = async () => {
    try {
      const response = await apiClient.post("/rooms", { roomName: `Room ${rooms.length + 1}` });
      if (response.data) {
        toast.success("Room created successfully");
        console.log("response.data" , response.data);
        
        setRooms((prevRooms) => [...prevRooms, response.data]);
        
      }
    } catch (error) {
      console.error("Error creating room:", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <h1 className="text-4xl mb-4">Join Chat Room</h1>
      <input
        type="text"
        placeholder="Enter your name"
        className="mb-4 px-6 py-4 rounded bg-gray-700 text-white"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        key={selectedRoomId}
        className="mb-4 px-16 py-4 rounded bg-gray-700 text-white"
        value={selectedRoomId}
        onChange={(e) => setSelectedRoomId(e.target.value)}
      >
        <option value="" disabled>
          Select Room
        </option>
        {rooms.map((room) => (
          <option key={room.id} value={room.id}>
            {room.name}
          </option>
        ))}
      </select>
      <button
        onClick={handleJoinRoom}
        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        Join Room
      </button>
      <button
        onClick={createRoom}
        className="mt-4 bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
      >
        Create New Room
      </button>
    </div>
  );
};

export default LoginPage;