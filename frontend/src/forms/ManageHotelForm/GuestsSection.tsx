import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3 ">Guests</h2>
      <div className="grid grid-cols-2 bg-gray-300 p-6 gap-5">
        <span className="flex flex-col flex-1">
          <label
            htmlFor="adultCount"
            className="text-gray-700 text-sm font-bold flex-1 mb-1"
          >
            Adults
          </label>
          <input
            type="number"
            min={1}
            className="border rounded w-full py-1 px-2 font-normal bg-white"
            {...register("adultCount", { required: "Adults is required." })}
          />
          {errors.adultCount ? (
            <span className="text-red-500 text-sm ">
              {errors.adultCount.message}
            </span>
          ) : null}
        </span>
        <span className="flex flex-col flex-1">
          <label
            htmlFor="childCount"
            className="text-gray-700 text-sm font-bold flex-1 mb-1"
          >
            Children
          </label>
          <input
            type="number"
            min={0}
            className="border rounded w-full bg-white py-1 px-2 font-normal"
            {...register("childCount", {
              required: "Child Count is required.",
            })}
          />
          {errors.childCount ? (
            <span className="text-red-500 text-sm">
              {errors.childCount.message}
            </span>
          ) : null}
        </span>
      </div>
    </div>
  );
};

export default GuestsSection;
