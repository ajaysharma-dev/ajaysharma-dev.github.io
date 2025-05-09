import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import {
  HotelSearchResponse,
  HotelType,
  PaymentIntentResponse,
  UserType,
} from "../../backend/src/shared/types";
import { BookingFormData } from "./forms/BookingForm/BookingForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user!");
  }
  return response.json();
};

export const register = async (data: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Token invalid!");
  }
  return response.json();
};

export const login = async (data: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

export const addMyHotel = async (data: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: data,
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error("Error creating hotel");
  }
  return body;
};

export const getMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error("Error Fetching Hotels");
  }
  return body;
};
export const getMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error("Error Fetching Hotel");
  }
  return body;
};

export const updateHotelById = async (data: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-hotels/${data.get("hotelId")}`,
    {
      method: "PUT",
      credentials: "include",
      body: data,
    }
  );
  const body = await response.json();
  if (!response.ok) {
    throw new Error("Failed to update hotel!");
  }
  return body;
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOptions?: string;
};

export const searchHotels = async (
  SearchParams: SearchParams
): Promise<HotelSearchResponse> => {
  const queryparams = new URLSearchParams();
  queryparams.append("destination", SearchParams.destination || "");
  queryparams.append("checkIn", SearchParams.checkIn || "");
  queryparams.append("checkOut", SearchParams.checkOut || "");
  queryparams.append("adultCount", SearchParams.adultCount || "");
  queryparams.append("childCount", SearchParams.childCount || "");
  queryparams.append("page", SearchParams.page || "");

  queryparams.append("maxPrice", SearchParams.maxPrice || "");
  queryparams.append("sortOptions", SearchParams.sortOptions || "");

  SearchParams.facilities?.forEach((facility) =>
    queryparams.append("facilities", facility)
  );

  SearchParams.types?.forEach((type) => queryparams.append("types", type));
  SearchParams.stars?.forEach((star) => queryparams.append("stars", star));

  const response = await fetch(
    `${API_BASE_URL}/api/hotels/search?${queryparams}`
  );
  const body = await response.json();
  if (!response.ok) {
    throw new Error("Error fetching Hotels!");
  }
  return body;
};

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
  const body = await response.json();
  if (!response.ok) {
    throw new Error("Error Fetching Hotel");
  }
  return body;
};
export const createPaymentIntent = async (
  hotelId: string,
  numberOfNights: string
): Promise<PaymentIntentResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ numberOfNights }),
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const body = await response.json();
  if (!response.ok) {
    throw new Error("Error Fetching Payment Intent");
  }
  return body;
};
export const createBooking = async (data: BookingFormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/${data.hotelId}/bookings`,
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Error Booking hotel");
  }
};
