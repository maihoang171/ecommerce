import logo from "../../assets/logo.png";
import { useRegister } from "../../hooks/use-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerUserDTO } from "../../../../shared/user-dto";
import type { IRegisterUserRequest } from "../../services/user";

export default function RegisterForm() {
  const { error: serverError, formKey, handleRegister } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerUserDTO),
  });

  const onSubmit = async (data: IRegisterUserRequest) => {
    await handleRegister(data)
  }
  
  return (
    <div className="flex flex-col justify-center items-center w-full my-6 max-w-sm mx-auto">
      <img
        src={logo}
        alt="logo"
        className="w-1/2 h-auto object-cover mx-auto"
      />
      <div className="border p-3 rounded-xl w-90 border-gray-400 backdrop-blur-md bg-white/30">
        <h1 className="text-center text-2xl font-bold">
          Create your new account
        </h1>
        <p className="text-center text-gray-600">It&apos;s quick and easy</p>

        <hr className="my-6 border-gray-300" />

        <form
          key={formKey}
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full"
        >
          {/* First name */}
          <label className="input validator flex items-center pl-4 gap-2 border rounded-sm w-full focus-within:outline-none focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 border-gray-400">
            <input
              type="text"
              placeholder="First name"
              className="w-full bg-transparent outline-none border-none pl-3 focus:ring-0"
              {...register("firstName")}
            />
          </label>
          {errors.firstName && (
            <p className="text-red-500 text-xs">{errors.firstName.message}</p>
          )}

          {/* //Last name */}
          <label className="input validator flex items-center pl-4 gap-2 border rounded-sm  w-full focus-within:outline-none focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 border-gray-400">
            <input
              type="text"
              placeholder="Last name"
              className="w-full bg-transparent outline-none border-none pl-3 focus:ring-0"
              {...register("lastName")}
            />
          </label>
          {errors.lastName && (
            <p className="text-red-500 text-xs">{errors.lastName.message}</p>
          )}

          {/* //Phone number */}
          <label className="input validator flex items-center gap-2 border rounded-sm w-full p-1.5 focus-within:outline-none focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 border-gray-400">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
            >
              <g fill="none">
                <path
                  d="M7.25 11.5C6.83579 11.5 6.5 11.8358 6.5 12.25C6.5 12.6642 6.83579 13 7.25 13H8.75C9.16421 13 9.5 12.6642 9.5 12.25C9.5 11.8358 9.16421 11.5 8.75 11.5H7.25Z"
                  fill="currentColor"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 1C4.61929 1 3.5 2.11929 3.5 3.5V12.5C3.5 13.8807 4.61929 15 6 15H10C11.3807 15 12.5 13.8807 12.5 12.5V3.5C12.5 2.11929 11.3807 1 10 1H6ZM10 2.5H9.5V3C9.5 3.27614 9.27614 3.5 9 3.5H7C6.72386 3.5 6.5 3.27614 6.5 3V2.5H6C5.44771 2.5 5 2.94772 5 3.5V12.5C5 13.0523 5.44772 13.5 6 13.5H10C10.5523 13.5 11 13.0523 11 12.5V3.5C11 2.94772 10.5523 2.5 10 2.5Z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
            <input
              type="tel"
              className="tabular-nums"
              placeholder="Phone"
              {...register("phoneNumber")}
            />
          </label>
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>
          )}

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
          <label className="input validator flex items-center gap-1 border rounded-sm w-full p-1.5 focus-within:outline-none focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 border-gray-400">
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

          <button className="btn mt-2 border rounded-sm w-1/2 mx-auto font-bold p-1.5 text-white bg-green-600 hover:cursor-pointer">
            Sign up
          </button>
          {serverError && <p className="text-red-500 text-xs">{serverError}</p>}
          <p className="text-blue-600 text-center">
            <a href="/login">Already have an account?</a>
          </p>
        </form>
      </div>
    </div>
  );
}
