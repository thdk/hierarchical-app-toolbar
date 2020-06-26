import React, { CSSProperties, useCallback } from "react";
import { library, IconProp } from "@fortawesome/fontawesome-svg-core";
import { faAlignCenter, faAlignJustify, faAlignLeft, faAlignRight } from "@fortawesome/free-solid-svg-icons";

import { Button } from "../../button";
import { useHtmlReducer } from "../../../contexts/editor-context";
import { selectSelectedHtmlData } from "../../../core/editor/selector";
import { HtmlData } from "../../../core/editor/types";

library.add(faAlignCenter, faAlignJustify, faAlignLeft, faAlignRight);

const parent = "text-alignment";

const alignmentData: { [key: string]: { icon: IconProp, text: string, style: Partial<HtmlData["style"]> } } = {
    "justify": {
        icon: "align-justify",
        text: "Justify",
        style: {
            textAlign: "justify",
        },
    },
    "left": {
        icon: "align-left",
        text: "Left",
        style: {
            textAlign: "left",
        },
    },
    "right": {
        icon: "align-right",
        text: "Right",
        style: {
            textAlign: "right",
        },
    },
    "center": {
        icon: "align-center",
        text: "Center",
        style: {
            textAlign: "center",
        },
    },
}

const AlignmentButton = ({
    alignment
}: {
    alignment: keyof typeof alignmentData;
}) => {
    const { state, dispatch } = useHtmlReducer();
    const { icon, text, style: alignmentStyle } = alignmentData[alignment];
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

export const textAlignment = [
    {
        button: <AlignmentButton alignment="justify" />,
        parent,
        id: "align-justify",
    },
    {
        button: <AlignmentButton alignment="left" />,
        parent,
        id: "align-left",
    },
    {
        button: <AlignmentButton alignment="center" />,
        parent,
        id: "align-center",
    },
    {
        button: <AlignmentButton alignment="right" />,
        parent,
        id: "align-right",
    },
];
