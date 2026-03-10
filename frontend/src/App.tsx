import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatPage from "./modules/chat/Chat";
import { Toaster } from "sonner";
import Layout from "./components/layout";
import JoinRoom from "./modules/chat/JoinRoom";
import Login from "./modules/auth/components/Login";
import Register from "./modules/auth/components/Register";
import { useAuth } from "./store/useAuth";
import { useEffect } from "react";

function App() {
  const { initializeAuth } = useAuth();

  useEffect(() => {
    initializeAuth();
  }, []);



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path="/" element={<JoinRoom />} />
          <Route path="/chats/:roomId" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
