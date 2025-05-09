import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">
        {getValues("_id") ? "Edit" : "Add"} Hotel
      </h1>
      <span className="flex flex-col">
        <label
          htmlFor="name"
          className="text-gray-700 text-sm font-bold flex-1 mb-1"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("name", { required: "Name is required." })}
        />
        {errors.name ? (
          <span className="text-red-500 text-sm ">{errors.name.message}</span>
        ) : null}
      </span>
      <div className="flex gap-4">
        <span className="flex flex-col flex-1">
          <label
            htmlFor="city"
            className="text-gray-700 text-sm font-bold flex-1 mb-1"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("city", { required: "City is required." })}
          />
          {errors.city ? (
            <span className="text-red-500 text-sm ">{errors.city.message}</span>
          ) : null}
        </span>
        <span className="flex flex-col flex-1">
          <label
            htmlFor="country"
            className="text-gray-700 text-sm font-bold flex-1 mb-1"
          >
            Country
          </label>
          <input
            type="text"
            id="country"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("country", { required: "Country is required." })}
          />
          {errors.country ? (
            <span className="text-red-500 text-sm ">
              {errors.country.message}
            </span>
          ) : null}
        </span>
      </div>
      <span className="flex flex-col">
        <label
          htmlFor="description"
          className="text-gray-700 text-sm font-bold flex-1 mb-1"
        >
          Descripiton
        </label>
        <textarea
          id="descripiton"
          rows={10}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("description", { required: "Description is required." })}
        />
        {errors.description ? (
          <span className="text-red-500 text-sm ">
            {errors.description.message}
          </span>
        ) : null}
      </span>
      <span className="flex flex-col max-w-[50%]">
        <label
          htmlFor="pricePerNight"
          className="text-gray-700 text-sm font-bold mb-1"
        >
          Price Per Night
        </label>
        <input
          type="number"
          min={1}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("pricePerNight", {
            required: "Price Per Night is required.",
          })}
        />
        {errors.name ? (
          <span className="text-red-500 text-sm ">{errors.name.message}</span>
        ) : null}
      </span>
      <span className="flex flex-col max-w-[50%]">
        <label
          htmlFor="starRating"
          className="text-gray-700 text-sm font-bold mb-1"
        >
          Star Rating
        </label>
        <select
          className="border-rounded w-full p-2 text-gray-700 font-normal"
          {...register("starRating", {
            required: "Star Rating is required.",
          })}
        >
          <option value="" className="text-sm font-bold">
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((val) => (
            <option value={val} key={val}>
              {val}
            </option>
          ))}
        </select>
        {errors.starRating ? (
          <span className="text-red-500 text-sm ">
            {errors.starRating.message}
          </span>
        ) : null}
      </span>
    </div>
  );
};

export default DetailsSection;
