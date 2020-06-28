import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { HtmlData } from "../../../core/editor/types";

export type CssData = {
    icon: IconProp,
    text: string,
    style: Partial<HtmlData["style"]>
};