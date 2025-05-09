import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../Context/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
export type SignInFormData = {
  email: string;
  password: string;
};
const SignIn = () => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();
  const mutation = useMutation(apiClient.login, {
    onSuccess: async () => {
      showToast({ message: "User Logged In", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>
      <span className="flex flex-col">
        <label
          htmlFor="email"
          className="text-gray-700 text-sm font-bold flex-1 mb-1"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "Email is required." })}
        />
        {errors.email ? (
          <span className="text-red-500 text-sm ">{errors.email.message}</span>
        ) : null}
      </span>
      <span className="flex flex-col">
        <label
          htmlFor="password"
          className="text-gray-700 text-sm font-bold flex-1"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 6,
              message: "Password must be alteast 6 chars.",
            },
          })}
        />
        {errors.password ? (
          <span className="text-red-500 text-sm ">
            {errors.password.message}
          </span>
        ) : null}
      </span>
      <span className="flex items-center justify-between">
        <span className="tex-sm">
          Not Registered?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Create an account here.
          </Link>
        </span>
        <button
          className="bg-blue-800 text-white p-2 font-bold hover:bg-blue-500"
          type="submit"
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default SignIn;
