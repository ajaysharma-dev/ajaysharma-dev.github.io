import { FunctionComponent } from "react";

type Props = {
  sortOptions: string;
  onChange: (value: string) => void;
};

const SortOptions: FunctionComponent<Props> = ({ sortOptions, onChange }) => {
  return (
    <select
      value={sortOptions}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border rounded-md"
    >
      <option value="">Sort By</option>
      <option value="starRating">Star Rating</option>
      <option value="pricePerNightDesc">Price Per Night (High to Low)</option>
      <option value="pricePerNightAsc">Price Per Night (Low to High)</option>
    </select>
  );
};

export default SortOptions;
