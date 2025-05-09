import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { useMutation, useQuery } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../Context/AppContext";
import { HotelType } from "../../../backend/src/shared/types";
import { useState } from "react";
const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();
  const [updatedHotel, setUpdatedHotel] = useState<HotelType | undefined>(
    undefined
  );
  const { data: hotel } = useQuery(
    "getMyHotelById",
    () => apiClient.getMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );
  const { mutate, isLoading } = useMutation(apiClient.updateHotelById, {
    onSuccess: (data: HotelType) => {
      setUpdatedHotel(data);
      showToast({ message: "Hotel Updated!", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const handleSave = (data: FormData) => {
    mutate(data);
  };

  return (
    <ManageHotelForm
      hotel={updatedHotel ?? hotel}
      onSave={handleSave}
      isLoading={isLoading}
    />
  );
};

export default EditHotel;
