import { useMutation } from "@tanstack/react-query";
import { instance } from "../../api";
import {
  getNumbers,
  getTotalPrice,
} from "../../../store/slices/rangePicker.slice";

const fetchGuestsInfo = async (dateValue: any) => {
  try {
    const { data } = await instance.post(
      "api/reservation/final-step",
      dateValue,
    );
    return data;
  } catch (error) {
    throw new Error("Failed to book");
  }
};

export const useGuestsInfoByMutation = (dateValue: any) => {
  return useMutation({
    mutationKey: ["roomsDetails"],
    mutationFn: () => fetchGuestsInfo(dateValue),
    onSuccess: (res) => {},
  });
};
