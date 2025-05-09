import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiSolidStar, BiStar } from "react-icons/bi";
const MyHotels = () => {
  const { data: HotelData } = useQuery("fetchMyHotels", apiClient.getMyHotels, {
    onError: () => {},
  });
  if (!HotelData)
    return (
      <>
        <span>No Hotel Data found!</span>
      </>
    );
  return (
    <div className="space-y-5">
      <span className="flex flex-col sm:justify-between sm:flex-row">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to={"/add-hotel"}
          className="flex w-25 my-2 bg-blue-600 text-white font-bold hover:bg-blue-500 p-2 sm:w-auto sm:my-auto"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {HotelData?.map((hotel, idx) => {
          return (
            <>
              <div
                className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
                key={idx}
              >
                <h2 className="text-2xl font-bold">{hotel.name}</h2>
                <div className="whitespace-pre-line">{hotel.description}</div>
                <div className="flex flex-col md:grid md:grid-cols-5 gap-2">
                  <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                    <BsMap className="mr-1" />
                    {hotel.city}, {hotel.country}
                  </div>
                  <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                    <BsBuilding className="mr-1" />
                    {hotel.type}
                  </div>
                  <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                    <BiMoney className="mr-1" />₹{hotel.pricePerNight} per Night
                  </div>
                  <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                    <BiHotel className="mr-1" />
                    {hotel.adultCount} adults, {hotel.childCount} children
                  </div>
                  <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                    {Array.from([1, 2, 3, 4, 5]).map((star) => {
                      return hotel.starRating <= star ? (
                        <BiSolidStar className="mr-1 text-yellow-500" />
                      ) : (
                        <BiStar className="mr-1 text-yellow-500" />
                      );
                    })}
                    Star rating
                  </div>
                </div>
                <span className="flex justify-end">
                  <Link
                    to={`/edit-hotel/${hotel._id}`}
                    className="flex bg-blue-600 text-white font-bold hover:bg-blue-500 p-2"
                  >
                    View details
                  </Link>
                </span>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default MyHotels;
