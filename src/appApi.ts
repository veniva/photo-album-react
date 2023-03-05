import { Photo } from "./features/gallery/gallerySlice";

export async function fetchPhotos(): Promise<Photo[]> {
    const res = await fetch("https://jsonplaceholder.typicode.com/photos");
    return await res.json();
}