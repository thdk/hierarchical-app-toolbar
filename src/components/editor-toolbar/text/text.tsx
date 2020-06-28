import { Button } from "../../button";
import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeading, faTextWidth, faTextHeight, faParagraph, faAlignCenter } from "@fortawesome/free-solid-svg-icons";
import { ToolbarButton } from "../../../contexts/toolbar-context";
import { CssButton } from "../css-button";
import { PixelSlider } from "../../pixel-slider";

library.add(faHeading, faTextWidth, faTextHeight, faParagraph, faAlignCenter);

const parent = "text";
export const textMain = [
    {
        button: <Button icon="text-width" text="Text width" />,
        content: <PixelSlider cssProperty={"letterSpacing"} />,
        parent,
        id: "text-width",
    },
    {
        button: <Button icon="text-height" text="Text height" />,
        content: <PixelSlider cssProperty={"fontSize"} />,
        parent,
        id: "text-height",
    },
    {
        button: <Button icon="align-center" text="Text alignment" />,
        parent,
        id: "text-alignment",
        showSiblings: true,
    },
    {
        button: <Button icon="heading" text="Heading" />,
        parent,
        id: "heading",
        showSiblings: true,
    },
    {
        navigate: false,
        button: <CssButton
            data={{
                icon: "paragraph",
                text: "Paragraph",
                style: {
                    fontSize: "12px",
                    padding: 0,
                    fontWeight: "normal",
                    letterSpacing: "1px",
                }
            }} />,
        parent,
        id: "paragraph",
    },
] as ToolbarButton[];
