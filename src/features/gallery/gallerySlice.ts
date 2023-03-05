import { createSlice } from "@reduxjs/toolkit";

export interface GalleryState {

}

const initialState: GalleryState = {

}

export const gallerySlice = createSlice({
    name: 'counter',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
    }
});

export default gallerySlice.reducer;