import React from "react";
import { faCameraRetro, faQuoteRight } from "@fortawesome/free-solid-svg-icons";

import { Button } from "../button";
import { text } from "./text";
import { photoToolbar } from "./photo-toolbar";

export const editorToolbar = [
    {
        button: <Button icon={faCameraRetro} text="Photo" />,
        id: "photo",
    },
    {
        button: <Button icon={faQuoteRight} text="Text" />,
        id: "text",
    },
    ...text,
    ...photoToolbar,
];