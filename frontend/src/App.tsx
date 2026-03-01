import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatPage from "./pages/Chat";
import { Toaster } from "sonner";
import Layout from "./components/layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JoinRoom from "./pages/JoinRoom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
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
