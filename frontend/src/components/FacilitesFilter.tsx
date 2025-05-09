import { ChangeEvent, FunctionComponent } from "react";
import { hotelFacilities } from "../confg/hotel-options-config";

type Props = {
  selectedFacilities: string[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const FacilitiesFilter: FunctionComponent<Props> = ({
  selectedFacilities,
  onChange,
}) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Facilities</h4>
      {hotelFacilities.map((type) => (
        <label className="flex items-center space-x-2" key={type}>
          <input
            type="checkbox"
            className="rounded"
            value={type}
            checked={selectedFacilities.includes(type)}
            onChange={onChange}
          />
          <span>{type}</span>
        </label>
      ))}
    </div>
  );
};

export default FacilitiesFilter;
