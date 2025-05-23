import { FunctionComponent } from "react";
import { HotelType } from "../../../backend/src/shared/types";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

const SearchResultCard: FunctionComponent<{ hotel: HotelType }> = ({
  hotel,
}) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
      <div className="w-full h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map((_, idx) => (
                <AiFillStar key={idx} className="fill-yellow-400" />
              ))}
            </span>
            <span className="ml-1 text-sm">{hotel.type}</span>
          </div>
          <Link
            className="text-2xl font-bold cursor-pointer"
            to={`/detail/${hotel._id}`}
          >
            {hotel.name}
          </Link>
        </div>
        <div>
          <div className="line-clamp-4">{hotel.description}</div>
        </div>
        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 2).map((facility, idx) => (
              <span
                className="bg-slate-300 p-2 rounded-lg font-bold text-sx whitespace-nowrap"
                key={idx}
              >
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 2 &&
                `+${hotel.facilities.length - 2} more`}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-bold">₹{hotel.pricePerNight} per night</span>
            <Link
              className="bg-blue-600 text-white h-full p-2 font-bold text-xl max-w-full hover:bg-blue-500"
              to={`/detail/${hotel._id}`}
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
