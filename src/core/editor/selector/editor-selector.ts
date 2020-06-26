import { EditorState } from "../reducer/editor-reducer";

export function selectHtmlState(state: EditorState) {
    return state.html;
}

export function selectPhotosState(state: EditorState) {
    return state.photos;
}
