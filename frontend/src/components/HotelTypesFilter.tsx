import { ChangeEvent, FunctionComponent } from "react";
import { hotelTypes } from "../confg/hotel-options-config";

type Props = {
  selectedHotelTypes: string[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypeFilter: FunctionComponent<Props> = ({
  selectedHotelTypes,
  onChange,
}) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
      {hotelTypes.map((type) => (
        <label className="flex items-center space-x-2" key={type}>
          <input
            type="checkbox"
            className="rounded"
            value={type}
            checked={selectedHotelTypes.includes(type)}
            onChange={onChange}
          />
          <span>{type}</span>
        </label>
      ))}
    </div>
  );
};

export default HotelTypeFilter;
