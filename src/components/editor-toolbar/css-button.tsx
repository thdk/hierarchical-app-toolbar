import React, { useCallback, CSSProperties } from "react";

import { CssData } from "./text/types";
import { useHtmlReducer } from "../../contexts/editor-context";
import { selectSelectedHtmlData } from "../../core/editor/selector";
import { Button } from "../button";

export const CssButton = ({
    data,
}: {
    data: CssData,
}) => {
    const { state, dispatch } = useHtmlReducer();
    const { icon, text, style: alignmentStyle } = data;
    const current = selectSelectedHtmlData(state);
    const { style, id } = current || {};

    const onClick = useCallback(() => {
        if (id) {
            dispatch({
                type: "update-html",
                data: {
                    style: { ...style, ...alignmentStyle }
                },
                id,
            });
        }
    }, [dispatch, alignmentStyle, id, style]);

    const isActive = current
        && current.style
        && Array.from(Object.keys(alignmentStyle))
            .every((key => {
                return (alignmentStyle)[key as keyof typeof alignmentStyle] === (current.style)[key as keyof typeof current.style]
            }));

    const buttonStyle: CSSProperties = {
        fontWeight: isActive ? "bold" : "normal",
    };

    return (
        <Button
            style={buttonStyle}
            icon={icon}
            text={text}
            onClick={onClick}
        />
    );
}