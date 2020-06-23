import { Button } from "../../button";
import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeading, faTextWidth, faTextHeight, faParagraph, faAlignCenter } from "@fortawesome/free-solid-svg-icons";
import { Slider } from "../../slider";
import { FontSizeSlider } from "./font-size";

library.add(faHeading, faTextWidth, faTextHeight, faParagraph, faAlignCenter);

const parent = "text";
export const textMain = [
    {
        button: <Button icon="text-width" text="Text width" />,
        action: <Slider min={1} max={30} value={13} />,
        parent,
        id: "text-width",
    },
    {
        button: <Button icon="text-height" text="Text height" />,
        action: <FontSizeSlider />,
        parent,
        id: "text-height",
    },
    {
        button: <Button icon="align-center" text="Text alignment" />,
        parent,
        id: "text-alignment",
    },
    {
        button: <Button icon="heading" text="Heading" />,
        parent,
        id: "heading",
    },
    {
        button: <Button icon="paragraph" text="Paragraph" />,
        parent,
        id: "paragraph",
    },
];
