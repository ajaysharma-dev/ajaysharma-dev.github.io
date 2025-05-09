import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
export type RegisterFormData = {
  firstName: string;
  LastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
const Register = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registration Success!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const password = watch("password");
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <span className="flex flex-col flex-1">
          <label
            htmlFor="firstName"
            className="text-gray-700 text-sm font-bold flex-1"
          >
            FirstName
          </label>
          <input
            type="text"
            id="firstName"
            className="border rounded w-full py-1 px-2 font-normal mb-1"
            {...register("firstName", { required: "First Name is required." })}
          />
          {errors.firstName ? (
            <span className="text-red-500 text-sm ">
              {errors.firstName.message}
            </span>
          ) : null}
        </span>
        <span className="flex flex-col flex-1">
          <label
            htmlFor="LastName"
            className="text-gray-700 text-sm font-bold flex-1"
          >
            LastName
          </label>
          <input
            type="text"
            id="LastName"
            className="border rounded w-full py-1 px-2 font-normal mb-1"
            {...register("LastName", { required: "Last Name is required." })}
          />
          {errors.LastName ? (
            <span className="text-red-500 text-sm ">
              {errors.LastName.message}
            </span>
          ) : null}
        </span>
      </div>
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
      <span className="flex flex-col">
        <label
          htmlFor="confirmPassword"
          className="text-gray-700 text-sm font-bold flex-1"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "Confirm password is required.";
              }
              if (val !== password) {
                return "Passwords do not match";
              }
            },
          })}
        />
        {errors.confirmPassword ? (
          <span className="text-red-500 text-sm ">
            {errors.confirmPassword.message}
          </span>
        ) : null}
      </span>
      <span>
        <button
          className="bg-blue-800 text-white p-2 font-bold hover:bg-blue-500"
          type="submit"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
