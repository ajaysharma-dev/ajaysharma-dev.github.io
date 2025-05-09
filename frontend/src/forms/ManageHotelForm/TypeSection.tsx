import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../confg/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 ">
        {hotelTypes.map((hotelType, idx) => (
          <label
            className={
              typeWatch === hotelType
                ? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2 font-semibold"
                : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold hover:bg-blue-500"
            }
            key={idx}
          >
            <input
              type="radio"
              value={hotelType}
              className="hidden"
              {...register("type", { required: "Hotel Type is required" })}
            />
            <span>{hotelType}</span>
          </label>
        ))}
      </div>
      {errors.type ? (
        <>
          <span className="text-red-500 text-sm ">{errors.type.message}</span>
        </>
      ) : null}
    </div>
  );
};

export default TypeSection;
