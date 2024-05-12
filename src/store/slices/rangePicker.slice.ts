import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IPickerDates } from "../../types/rangePicker.types";
import dayjs from "dayjs";

interface RangePickerState {
  dates: any;
  numbers: any;
  resultNumbers: any;
  numbersInfo: any;
  code: any;
  totalPrice: any;
  guestsCountNumber: any;
}

const initialState: RangePickerState = {
  dates: [dayjs(Date()).format("DD.MM.YY"), dayjs(Date()).format("DD.MM.YY")],
  guestsCountNumber: [],
  numbers: [
    {
      index: 1,
      adults: 2,
      childs: 0,
      isDeleteNumber: false,
      mattress: 0,
      nutrition: 0,
      type: "none",
      // guestsInfo: [
      // {
      //   reservation_id: null,
      //   name: "",
      //   lastName: "",
      //   fatherName: "",
      // },
      // ],
    },
  ],
  resultNumbers: [],
  numbersInfo: {},
  //   {
  //     index: 1,
  //     adults: 2,
  //     childs: 0,
  //     type: "standart",
  //     nutrition: 0,
  //     isDeleteNumber: false,
  //     mattress: 0,
  //   },
  //   {
  //     index: 1,
  //     adults: 2,
  //     childs: 0,
  //     type: "deluxe",
  //     nutrition: 0,
  //     isDeleteNumber: false,
  //     mattress: 0,
  //   },
  //   {
  //     index: 1,
  //     adults: 2,
  //     childs: 0,
  //     type: "deluxe",
  //     nutrition: 0,
  //     isDeleteNumber: false,
  //     mattress: 0,
  //   },
  // ],
  code: "",
  totalPrice: "",
};

export const RangePickerSlice = createSlice({
  name: "rangePicker",
  initialState,
  reducers: {
    pickerDates(state, action: PayloadAction<IPickerDates[]>) {
      state.dates = action.payload;
    },
    startPickerDate(state, action) {
      state.dates[0] = action.payload;
    },
    endPickerDate(state, action) {
      state.dates[1] = action.payload;
    },
    addCode(state, action) {
      state.code = action.payload;
    },
    getGuestsCountNumber(state, action) {
      state.guestsCountNumber = action.payload;
    },
    getNumbers(state, action) {
      // state.numbers = [];
      state.resultNumbers = action.payload;
    },
    getTotalPrice(state, action) {
      state.totalPrice = action.payload;
    },
    addNumber(state, action) {
      state.numbers = [...state.numbers, action.payload];
    },
    deleteNumber(state, action) {
      state.numbers = [...state.numbers].filter(
        (number) => number.index !== action.payload,
      );
    },
    typeSelection(state, action) {
      state.numbers[action.payload.id].type = action.payload.type;
    },
    getNumbersInfo(state, action) {
      if (action.payload === "local") {
        state.numbersInfo = JSON.parse(
          localStorage.getItem("numbersInfo") || "",
        );
        state.code = JSON.parse(localStorage.getItem("numbersInfo") || "").code;
      } else {
        state.numbersInfo = action.payload;
        localStorage.setItem("numbersInfo", JSON.stringify(action.payload));
      }
    },
    increaseAdults(state, action) {
      const index = action.payload;
      state.numbers = state.numbers.map((number: any, i: any) => {
        if (i === index) {
          return {
            ...number,
            adults: Math.min(2, number.adults + 1),
          };
        }
        return number;
      });
    },
    decreaseAdults(state, action) {
      const index = action.payload;
      state.numbers = state.numbers.map((number: any, i: any) => {
        if (i === index) {
          return {
            ...number,
            adults: Math.max(1, number.adults - 1),
          };
        }
        return number;
      });
    },
    increaseChilds(state, action) {
      const index = action.payload;
      state.numbers = state.numbers.map((number: any, i: any) => {
        if (i === index) {
          return {
            ...number,
            childs: Math.min(2, number.childs + 1),
          };
        }
        return number;
      });
    },
    decreaseChilds(state, action) {
      const index = action.payload;
      state.numbers = state.numbers.map((number: any, i: any) => {
        if (i === index) {
          return {
            ...number,
            childs: Math.max(0, number.childs - 1),
          };
        }
        return number;
      });
    },
    increaseExtraMattress(state, action) {
      const index = action.payload;
      state.numbers = state.numbers.map((element: any, i: any) => {
        if (i === index) {
          return {
            ...element,
            mattress: Math.min(2, element.mattress + 1),
          };
        }
        return element;
      });
    },
    decreaseExtraMattress(state, action) {
      const index = action.payload;
      state.numbers = state.numbers.map((element: any, i: any) => {
        if (i === index) {
          return {
            ...element,
            mattress: Math.max(0, element.mattress - 1),
          };
        }
        return element;
      });
    },
    increaseExtraNutrition(state, action) {
      const index = action.payload;
      state.numbers = state.numbers.map((element: any, i: any) => {
        if (i === index) {
          return {
            ...element,
            nutrition: Math.min(10, element.nutrition + 1),
          };
        }
        return element;
      });
    },
    decreaseExtraNutrition(state, action) {
      const index = action.payload;
      state.numbers = state.numbers.map((element: any, i: any) => {
        if (i === index) {
          return {
            ...element,
            nutrition: Math.max(0, element.nutrition - 1),
          };
        }
        return element;
      });
    },
    // increaseExtraMattress(state, action) {
    //   const index = action.payload;
    //   state.extraInfo = state.extraInfo.map((element: any, i: any) => {
    //     if (i === index) {
    //       return {
    //         ...element,
    //         mattress: Math.min(2, element.mattress + 1),
    //       };
    //     }
    //     return element;
    //   });
    // },
    // decreaseExtraMattress(state, action) {
    //   const index = action.payload;
    //   state.extraInfo = state.extraInfo.map((element: any, i: any) => {
    //     if (i === index) {
    //       return {
    //         ...element,
    //         mattress: Math.max(0, element.mattress - 1),
    //       };
    //     }
    //     return element;
    //   });
    // },
    // increaseExtraNutrition(state, action) {
    //   const index = action.payload;
    //   state.extraInfo = state.extraInfo.map((element: any, i: any) => {
    //     if (i === index) {
    //       return {
    //         ...element,
    //         nutrition: Math.min(10, element.nutrition + 1),
    //       };
    //     }
    //     return element;
    //   });
    // },
    // decreaseExtraNutrition(state, action) {
    //   const index = action.payload;
    //   state.extraInfo = state.extraInfo.map((element: any, i: any) => {
    //     if (i === index) {
    //       return {
    //         ...element,
    //         nutrition: Math.max(0, element.nutrition - 1),
    //       };
    //     }
    //     return element;
    //   });
    // },
  },
});

export const {
  pickerDates,
  startPickerDate,
  endPickerDate,
  addNumber,
  deleteNumber,
  increaseAdults,
  decreaseAdults,
  increaseChilds,
  decreaseChilds,
  increaseExtraMattress,
  decreaseExtraMattress,
  increaseExtraNutrition,
  decreaseExtraNutrition,
  typeSelection,
  getNumbersInfo,
  addCode,
  getTotalPrice,
  getNumbers,
  getGuestsCountNumber,
} = RangePickerSlice.actions;

export const selectCount = (state: RootState) => state.rangePickerReducer;

export default RangePickerSlice.reducer;
