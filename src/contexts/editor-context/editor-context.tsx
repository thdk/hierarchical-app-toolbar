import React, { useMemo } from "react";
import { useReducer } from "react";
import { editorReducer, EditorState, EditorAction } from "../../core/editor/reducer";

export const EditorContext = React.createContext({} as { state: EditorState, dispatch: React.Dispatch<EditorAction> });

export const EditorContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer<typeof editorReducer>(editorReducer, {
        data: [],
        selectedId: undefined,
        defaultStyle: {
            textAlign: "left",
            fontSize: "10px",
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