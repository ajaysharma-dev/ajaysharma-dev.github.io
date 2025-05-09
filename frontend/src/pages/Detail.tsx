import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestinfoForm from "../forms/GuestInfoForm/GuestinfoForm";

const Detail = () => {
  const { hotelId } = useParams();
  const { data: Hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );
  if (!Hotel) {
    return <></>;
  }
  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: Hotel?.starRating || 0 }).map(() => {
            return <AiFillStar className="fill-yellow-400" />;
          })}
        </span>
        <h1 className="text-3xl font-bold">{Hotel?.name}</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {Hotel?.imageUrls.map((image, idx) => (
          <div className="h-[300px]">
            <img
              src={image}
              key={idx}
              alt={Hotel?.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {Hotel?.facilities.map((facility, idx) => (
          <div
            className="border border-slate-700 bg-slate-300/75 rounded-md p-3"
            key={idx}
          >
            {facility}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{Hotel?.description}</div>
        <div className="h-fit">
          <GuestinfoForm
            pricePerNight={Hotel?.pricePerNight}
            hotelId={Hotel?._id}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
