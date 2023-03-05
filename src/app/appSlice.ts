import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { fetchPhotos } from "../appApi";
import { AppThunk } from "./store";

export interface AppState {
  photos: Photo[];
}

const initialState: AppState = {
  photos: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    reset: (state: Draft<AppState>, action: PayloadAction<AppState>) => {
      state = initialState;
    },
    setPhotos: (state: Draft<AppState>, action: PayloadAction<Photo[]>) => {
      state.photos = action.payload;
    }
  },
});

export default appSlice.reducer;

export const { reset, setPhotos } = appSlice.actions;

export function fetchDataThunk(): AppThunk {
  return (dispatch) => {
    fetchPhotos().then(data => {
      dispatch(setPhotos(data))
    });
  };
}

export type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};
