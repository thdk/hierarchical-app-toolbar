import { photosReducer, PhotosState, PhotosAction } from "./photos-reducer";
import { HtmlAction, HtmlState, htmlReducer } from "./html-reducer";

export type EditorAction = PhotosAction | HtmlAction;

export type EditorState = {
    photos: PhotosState;
    html: HtmlState;
};

export function editorReducer(state: EditorState, action: EditorAction) {
    return {
        photos: photosReducer(state.photos, action as PhotosAction),
        html: htmlReducer(state.html, action as HtmlAction),
    };
}
