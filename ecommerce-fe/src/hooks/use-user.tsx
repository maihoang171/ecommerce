import { useState } from "react";
import axios from "axios";
import { useUserStore } from "../stores/useUserStore";
import {
  login,
  getMe,
  type ILoginRequest,
  type IRegisterUserRequest,
  registerUser,
  logout,
} from "../services/user";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLogin = () => {
  const [error, setError] = useState("");
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleLogin = async (payload: ILoginRequest) => {
    try {
      setError("");

      await login(payload);
      const user = await getMe();
      setUser(user.data.data);

      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setError("Invalid username or password");
        } else {
          setError("An errored occurred");
        }
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return {
    error,
    setError,
    handleLogin,
  };
};

export const useRegister = () => {
  const [formKey, setFormKey] = useState(0);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (payload: IRegisterUserRequest) => {
    try {
      setError("");
      await registerUser(payload);

      setFormKey((prev) => prev + 1);

      toast.success("Your account has been created", {
        position: "bottom-left",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Registration failed");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };
  return {
    error,
    formKey,
    setFormKey,
    handleRegister,
  };
};

export const useLogout = () => {
  const setUser = useUserStore(state => state.setUser)
  const [error, setError] = useState("");
  const handleLogout = async () => {
    try {
      setError("");
      await logout();
      setUser(null)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("An error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return { error, handleLogout };
};
