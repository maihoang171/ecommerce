import { Route, Routes } from "react-router-dom";
import RegisterForm from "./pages/user/Register";
import Login from "./pages/user/Login";
import { Toaster } from "sonner";
import Home from "./pages/Home";
import MainLayout from "./components/MainLayout";
import Products from "./pages/Products";

function App() {
  return (
    <>
      <div className="h-screen">
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products/>}/>
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
