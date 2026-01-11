import { Route, Routes } from "react-router-dom";
import RegisterForm from "./pages/user/Register";
import Login from "./pages/user/Login";
import { Toaster } from "sonner";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <div className="h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
