import { PhotosState } from "../reducer/photos-reducer";

export function selectPhotos(state: PhotosState) {
    return state.photos;
}
