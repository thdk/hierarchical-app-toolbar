import { EditorState } from "../reducer";
import { HtmlData } from "../types";

export function selectSelectedHtmlData(state: EditorState): HtmlData | undefined {
    const id = state.selectedId;

    if (!id) return undefined;

    return state.data.find(i => i.id === id);
}
