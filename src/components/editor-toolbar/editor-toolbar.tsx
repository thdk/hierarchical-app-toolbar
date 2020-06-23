import React from "react";

import { Button } from "../button";
import { text } from "./text";
import { photoToolbar } from "./photo-toolbar";
import {faCameraRetro, faQuoteRight} from "@fortawesome/free-solid-svg-icons";

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