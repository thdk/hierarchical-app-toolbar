import React, { useMemo } from "react";
import { useReducer } from "react";
import { editorReducer, EditorState, EditorAction } from "../../core/editor/reducer/editor-reducer";
import { selectHtmlState, selectPhotosState } from "../../core/editor/selector";
import { Photo } from "../../core/editor/types";

export const EditorContext = React.createContext({} as { state: EditorState, dispatch: React.Dispatch<EditorAction> });

export const EditorContextProvider = ({ children }: React.PropsWithChildren<unknown>) => {
    const [state, dispatch] = useReducer<typeof editorReducer>(editorReducer, {
        html: {
            data: [],
            selectedId: undefined,
            defaultStyle: {
                textAlign: "left",
                fontSize: "10px",
            }
        },
        photos: {
            photos: [] as Photo[],
        }
    });

    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    return (
        <EditorContext.Provider value={contextValue}>
            {children}
        </EditorContext.Provider>
    );
};

export const useEditorReducer = () => React.useContext(EditorContext);

export const useHtmlReducer = () => {
    const {state, dispatch} = React.useContext(EditorContext);
    return {
        state: selectHtmlState(state),
        dispatch,
    };
}

export const usePhotosReducer = () => {
    const {state, dispatch} = React.useContext(EditorContext);
    return {
        state: selectPhotosState(state),
        dispatch,
    };
}