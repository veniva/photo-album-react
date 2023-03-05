import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { fetchPhotos } from "../../appApi";
import { AppThunk } from "../../app/store";

export interface GalleryState {
    photos: Photo[];
  }
  
  const initialState: GalleryState = {
    photos: [],
  };
  
  export const gallerySlice = createSlice({
    name: "gallery",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      reset: (state: Draft<GalleryState>, action: PayloadAction<GalleryState>) => {
        state = initialState;
      },
      setPhotos: (state: Draft<GalleryState>, action: PayloadAction<Photo[]>) => {
        state.photos = action.payload;
      }
    },
  });
  
  export default gallerySlice.reducer;
  
  export const { reset, setPhotos } = gallerySlice.actions;
  
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