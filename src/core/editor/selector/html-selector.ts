import { HtmlState } from "../reducer";
import { HtmlData } from "../types";

export function selectSelectedHtmlData(state: HtmlState): HtmlData | undefined {
    const id = state.selectedId;

    if (!id) return undefined;

    return state.data.find(i => i.id === id);
}
