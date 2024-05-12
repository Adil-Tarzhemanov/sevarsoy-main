import { configureStore } from '@reduxjs/toolkit';
import rangePickerReducer from './slices/rangePicker.slice'

export const store = configureStore({
    reducer: {
        rangePickerReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch