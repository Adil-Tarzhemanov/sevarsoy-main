import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "../../api";
import {
  getGuestsCountNumber,
  getNumbers,
  getTotalPrice,
} from "../../../store/slices/rangePicker.slice";

const fetchRoomsDetails = async (dateValue: any) => {
  try {
    const { data } = await instance.post(
      "api/reservation/prebooking-step",
      dateValue,
    );
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const useRoomsDetailsByMutation = (
  dateValue: any,
  navigate: any,
  dispatch: any,
) => {
  const client = useQueryClient();
  return useMutation({
    mutationKey: ["roomsDetails"],
    mutationFn: () => fetchRoomsDetails(dateValue),
    onSuccess: (res) => {
      navigate("/api/reservation/prebooking-step");
      const updatedNumbers = res.Rooms.map((number: any) => ({
        index: number.room_id + 1,
        adults: number.adults,
        childs: number.childs,
        type: number.room_type,
        nutrition: number.food,
        isDeleteNumber: false,
        mattress: number.mattress,
      }));

      dispatch(getNumbers(updatedNumbers));

      const updatedGuestsInfo = res.Rooms.flatMap(
        (number: any, index: number) =>
          Array.from({ length: number.adults + number.childs }, () => ({
            index: index + 1, // Сохраняем индекс комнаты для каждого гостя
            reservation_id: number.reservation_id,
            name: "",
            lastName: "",
            fatherName: "",
          })),
      );

      dispatch(getGuestsCountNumber(updatedGuestsInfo));
      dispatch(getTotalPrice(res.total_price));
      console.log(res);
      client.invalidateQueries({ queryKey: ["roomsDetails"] });
    },
  });
};
