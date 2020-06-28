import React from "react";
import { faHeading } from "@fortawesome/free-solid-svg-icons";

import { CssData } from "./types";
import { CssButton } from "../css-button";

const parent = "heading";

const headingData: {[key: string]: CssData} = {
    "h1": {
        icon: faHeading,
        text: "H1",
        style: {
            fontSize: "30px",
            padding: "1em 0 1em 0",
            fontWeight: "bold",
        },
    },
    "h2": {
        icon: faHeading,
        text: "H2",
        style: {
            fontSize: "22px",
            padding: "0.8em 0 0.8em 0",
            fontWeight: "bold",
        },
    },
    "h3": {
        icon: faHeading,
        text: "H3",
        style: {
            fontSize: "20px",
            padding: "0.4em 0 0.4em 0",
            fontWeight: "bold",
        },
    },
    "h4": {
        icon: faHeading,
        text: "H4",
        style: {
            fontSize: "12px",
            padding: "0.2em 0 0.2em 0",
            fontWeight: "bold",
        },
    },
    "h5": {
        icon: faHeading,
        text: "H5",
        style: {
            fontSize: "10px",
            padding: "0 0 0 0",
            fontWeight: "bold",
        },
    },
    "h6": {
        icon: faHeading,
        text: "H6",
        style: {
            fontSize: "8px",
            padding: "0 0 0 0",
            fontWeight: "bold",
        },
    },
}

export const headings = [
    {
        button: <CssButton data={headingData["h1"]} />,
        parent,
        id: "heading-1",
    },
    {
        button: <CssButton data={headingData["h2"]} />,
        parent,
        id: "heading-2",
    },
    {
        button: <CssButton data={headingData["h3"]} />,
        parent,
        id: "heading-3",
    },
    {
        button: <CssButton data={headingData["h4"]} />,
        parent,
        id: "heading-4",
    },
    {
        button: <CssButton data={headingData["h5"]} />,
        parent,
        id: "heading-5",
    },
    {
        button: <CssButton data={headingData["h6"]} />,
        parent,
        id: "heading-6",
    },
];
