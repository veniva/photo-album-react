import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { fetchPhotos } from "../appApi";
import { AppThunk } from "./store";

export interface AppState {
  favorites: number[];
}

const initialState: AppState = {
  favorites: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    reset: (state: Draft<AppState>, action: PayloadAction<AppState>) => {
      state = initialState;
    },
    setFavorites: (state: Draft<AppState>, action: PayloadAction<number[]>) => {
      state.favorites = action.payload;
    },
  },
});

export default appSlice.reducer;

export const { reset, setFavorites } = appSlice.actions;
