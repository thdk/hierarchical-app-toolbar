import React from "react";

import "./editor.css";
import { useCallback } from "react";
import { useToolbar } from "../../contexts/toolbar-context";
import { Text } from "../text";
import { useHtmlReducer } from "../../contexts/editor-context";

export const Editor = () => {
    const {
        navigate,
    } = useToolbar();

    const {
        state,
        dispatch
    } = useHtmlReducer();

    const onClick = useCallback((id: string) => {
        navigate("text", { allowChild: true });
        dispatch({
            type: "select-html",
            data: id,
        })
    }, [navigate, dispatch]);

    return (
        <div
            className="editor"
        >
            <p>Click the text below to select and start editing</p>
            {state.data.map(i => {
                return (
                    <Text
                        key={i.id}
                        tag={i.tag}
                        onClick={onClick.bind(null, i.id)}
                        className={state.selectedId === i.id ? "active" : undefined}
                        style={i.style}
                    >
                        {i.content}
                    </Text>
                )
            })}
        </div>
    );
};
