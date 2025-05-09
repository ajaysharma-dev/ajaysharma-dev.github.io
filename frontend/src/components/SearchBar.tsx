import { FormEvent, useState } from "react";
import { useSearchContext } from "../Context/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "../../node_modules/react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const search = useSearchContext();
  const navigate = useNavigate();
  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };
  const handleReset = () => {
    const isCheckInDefault =
      checkIn.getDay() == new Date().getDay() &&
      checkIn.getMonth() == new Date().getMonth() &&
      checkIn.getFullYear() == new Date().getFullYear();
    const isCheckOutDefault =
      checkOut.getDay() == new Date().getDay() &&
      checkOut.getMonth() == new Date().getMonth() &&
      checkOut.getFullYear() == new Date().getFullYear();
    if (
      destination === "" &&
      adultCount === 1 &&
      childCount === 0 &&
      isCheckInDefault &&
      isCheckOutDefault
    ) {
      return;
    }
    setDestination("");
    setCheckIn(new Date());
    setCheckOut(new Date());
    setAdultCount(1);
    setChildCount(0);
    search.saveSearchValues("", new Date(), new Date(), 1, 0);
  };
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4"
    >
      <div className="flex flex-row items-center flex-1 bg-white p-2 rounded-lg">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          type="text"
          placeholder="Where to?"
          name="destination"
          className="text-md w-full focus:outline-none"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <div className="flex bg-white px-2 py-1 gap-2 rounded-lg">
        <label className="items-center flex">
          Adults:
          <input
            type="number"
            className="w-full p-1 focus:outline-none font-bold"
            min={1}
            max={20}
            value={adultCount}
            onChange={(e) => setAdultCount(parseInt(e.target.value))}
          />
        </label>
        <label className="items-center flex">
          Children:
          <input
            type="number"
            className="w-full p-1 focus:outline-none font-bold"
            min={0}
            max={20}
            value={childCount}
            onChange={(e) => setChildCount(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="min-w-full bg-white p-2 focus:outline-none rounded-lg"
          wrapperClassName="min-w-full"
          name="check-in"
        />
      </div>
      <div>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkOut}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-Out Date"
          className="min-w-full bg-white p-2 focus:outline-none rounded-lg"
          wrapperClassName="min-w-full"
          name="check-out"
        />
      </div>
      <div className="flex gap-1">
        <button
          className="w-2/3 bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500 rounded-lg cursor-pointer"
          type="submit"
        >
          Search
        </button>
        <button
          className="w-1/3 bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500 rounded-lg"
          onClick={handleReset}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
