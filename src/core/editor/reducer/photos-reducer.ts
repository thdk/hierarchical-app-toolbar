import { Photo } from "../types";

export type PhotosState = {
    photos: Photo[];
};

export type PhotosAction = { type: "add", payload: Photo[]};

export function photosReducer(state: PhotosState, action: PhotosAction) {
    switch(action.type) {
        case "add": {
            return {
                photos: action.payload,
            };
        }
        default: {
            return state;
        }
    }
}