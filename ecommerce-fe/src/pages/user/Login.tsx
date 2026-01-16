import logo from "../../assets/logo.png";
import { useLogin } from "../../hooks/use-user";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ILoginRequest } from "../../services/user";
import { loginDTO } from "../../../../shared/user-dto";

function Login() {
  const navigate = useNavigate();
  const { error: serverError, handleLogin } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginRequest>({
    resolver: zodResolver(loginDTO),
  });

  const onSubmit = async (data: ILoginRequest) => {
    await handleLogin(data);
  };

  return (
    <div className="flex flex-col justify-center w-full my-6 max-w-sm mx-auto">
      <img
        src={logo}
        alt="logo"
        className="w-1/2 h-auto object-cover mx-auto"
      />
      <div className="flex flex-col justify-center border p-4 rounded-xl border-gray-400 backdrop-blur-md bg-white/30">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full"
        >
          {/* username */}
          <label className="input validator flex items-center gap-2 border rounded-sm w-full p-1.5 focus-within:outline-none focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 border-gray-400">
            <svg
              className="h-[1em] opacity-50 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>

            <input
              type="text"
              required
              placeholder="Username"
              className="grow focus:outline-none"
              {...register("username")}
            />
          </label>
          {errors.username && (
            <p className="text-red-500 text-xs">{errors.username.message}</p>
          )}

          {/* password */}
          <label className="input validator flex items-center gap-2 border rounded-sm w-full p-1.5 focus-within:outline-none focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 border-gray-400">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              required
              placeholder="Password"
              className="grow focus-within:outline-none"
              {...register("password")}
            />
          </label>
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}

          <button className="btn mt-2 border rounded-sm w-full mx-auto font-bold p-1.5 text-white bg-blue-600 hover:cursor-pointer">
            Login
          </button>
          {serverError && (
            <div className=" text-red-500 text-xs">{serverError}</div>
          )}
        </form>

        <hr className="my-2 border-gray-300" />

        <button
          onClick={() => navigate("/register")}
          className="btn border rounded-sm max-w-1/2 mx-auto flex font-bold text-white bg-green-600 hover:cursor-pointer"
        >
          Create new account
        </button>
      </div>
    </div>
  );
}

export default Login;
