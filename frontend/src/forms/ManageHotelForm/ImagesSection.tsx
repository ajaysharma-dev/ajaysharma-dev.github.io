import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { MouseEvent } from "react";
import { BiTrash } from "react-icons/bi";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();
  const existingImageUrls = watch("imageUrls");
  const handleDelete = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    imageUrl: String
  ) => {
    event?.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((img) => img !== imageUrl)
    );
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border-rounded p-4 flex flex-col gap-4">
        {existingImageUrls && (
          <div className="grid grid-cols-3 xl:grid-cols-6 gap-4">
            {existingImageUrls.map((img, idx) => (
              <div className="relative group" key={idx}>
                <img src={img} className="min-h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-gray-950/50 bg-opacity-0 opacity-0 group-hover:opacity-100">
                  <button
                    className="flex items-center text-white cursor-pointer rounded-md border-white border-2 px-2 py-1"
                    onClick={(e) => handleDelete(e, img)}
                  >
                    <BiTrash />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength =
                (imageFiles?.length || 0) + (existingImageUrls?.length || 0);
              if (totalLength === 0)
                return "At least one image should be added";
              if (totalLength > 6)
                return "Total number of images should be less than 6";
            },
          })}
        />
        {errors.imageFiles ? (
          <span className="text-red-500 text-sm">
            {errors.imageFiles.message}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default ImagesSection;
