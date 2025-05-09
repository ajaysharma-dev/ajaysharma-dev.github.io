import { useQuery } from "react-query";
import { useSearchContext } from "../Context/SearchContext";
import * as apiClient from "../api-client";
import { ChangeEvent, useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypeFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitesFilter";
import PriceFilter from "../components/PriceFilter";
import SortOptions from "../components/SortOptions";
const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelType, setSelectedHotelType] = useState<string[]>([]);
  const [facilities, setFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();

  const [sortOptions, setSortOptions] = useState<string>("");
  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelType,
    facilities,
    maxPrice: selectedPrice?.toString(),
    sortOptions,
  };
  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams)
  );

  const handleStarsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;
    setSelectedStars((prev) =>
      event.target.checked
        ? [...prev, starRating]
        : prev.filter((star) => star !== starRating)
    );
  };
  const handleHotelTypesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const types = event.target.value;
    setSelectedHotelType((prev) =>
      event.target.checked
        ? [...prev, types]
        : prev.filter((hotel) => hotel !== types)
    );
  };
  const handleFacilitesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const facilities = event.target.value;
    setFacilities((prev) =>
      event.target.checked
        ? [...prev, facilities]
        : prev.filter((hotel) => hotel !== facilities)
    );
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-500 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypeFilter
            selectedHotelTypes={selectedHotelType}
            onChange={handleHotelTypesChange}
          />
          <FacilitiesFilter
            selectedFacilities={facilities}
            onChange={handleFacilitesChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          <SortOptions
            sortOptions={sortOptions}
            onChange={(value) => setSortOptions(value)}
          />
        </div>
        {hotelData?.data.map((hotel, idx) => (
          <SearchResultCard hotel={hotel} key={idx} />
        ))}
        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPagechange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
