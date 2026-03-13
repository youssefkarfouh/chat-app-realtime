import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatPage from "./modules/chat/components/Chat";
import JoinRoom from "./modules/chat/components/JoinRoom";
import Login from "./modules/auth/components/Login";
import Register from "./modules/auth/components/Register";
import { useAuth } from "./global/store/useAuth";
import { useEffect } from "react";
import ProtectedRoute from "./components/protected-routes/protected-route";
import GuestRoute from "./components/protected-routes/guest-route";

function App() {
  const { initializeAuth, isInitializing } = useAuth();

  useEffect(() => {
    initializeAuth();
  }, []);

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f5f7]">
        <div className="text-2xl font-bold text-[#6633cc] animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<JoinRoom />} />
            <Route path="/chats/:roomId" element={<ChatPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
