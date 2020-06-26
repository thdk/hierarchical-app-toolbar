import { HtmlData } from "../types";

export type HtmlState = {
    data: HtmlData[];
    selectedId: string | undefined;
    defaultStyle: HtmlData["style"];
}

export type HtmlAction =
    | { type: 'update-html', data: Partial<HtmlData>, id: string }
    | { type: 'add-html', data: HtmlData }
    | { type: 'select-html', data: string | undefined }
    | { type: 'set-default-style', data: HtmlData["style"] }
    | { type: 'request-html' }
    | { type: 'request-html-success', data: HtmlData[] }
    ;

export function elementsReducer(state: HtmlData[], action: HtmlAction): HtmlData[] {
    switch (action.type) {
        case 'request-html-success':{
            return action.data;
        }
        case 'update-html': {
            const index = state.findIndex(i => i.id === action.id);
            const updatedItem = { ...state[index], ...action.data };
            return [...state.slice(0, index), updatedItem, ...state.slice(index + 1)];
        }
        case 'add-html':
            return [...state, action.data];
        default:
            return state;
    }
}

export function defaultStyleReducer(state: HtmlData["style"], action: HtmlAction): HtmlData["style"] {
    switch (action.type) {
        case 'set-default-style':
            return action.data;
        default: return state;
    }
}

export function htmlSelectionReducer(state: string | undefined, action: HtmlAction): string | undefined {
    switch (action.type) {
        case 'select-html':
            return action.data;
        default:
            return state;
    }
}

export function htmlReducer(state: HtmlState, action: HtmlAction): HtmlState {
    return {
        data: elementsReducer(state.data, action),
        selectedId: htmlSelectionReducer(state.selectedId, action),
        defaultStyle: defaultStyleReducer(state.defaultStyle, action),
    };
}
