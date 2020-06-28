import React from "react";
import { faAlignCenter, faAlignJustify, faAlignLeft, faAlignRight } from "@fortawesome/free-solid-svg-icons";

import { CssData } from "./types";
import { CssButton } from "../css-button";

const parent = "text-alignment";

const alignmentData: { [key: string]: CssData } = {
    "justify": {
        icon: faAlignJustify,
        text: "Justify",
        style: {
            textAlign: "justify",
        },
    },
    "left": {
        icon: faAlignLeft,
        text: "Left",
        style: {
            textAlign: "left",
        },
    },
    "right": {
        icon: faAlignRight,
        text: "Right",
        style: {
            textAlign: "right",
        },
    },
    "center": {
        icon: faAlignCenter,
        text: "Center",
        style: {
            textAlign: "center",
        },
    },
}

export const textAlignment = [
    {
        button: <CssButton data={alignmentData["justify"]} />,
        parent,
        id: "align-justify",
        navigate: false,
    },
    {
        button: <CssButton data={alignmentData["left"]} />,
        parent,
        id: "align-left",
        navigate: false,
    },
    {
        button: <CssButton data={alignmentData["center"]} />,
        parent,
        id: "align-center",
        navigate: false,
    },
    {
        button: <CssButton data={alignmentData["right"]} />,
        parent,
        id: "align-right",
        navigate: false,
    },
];
