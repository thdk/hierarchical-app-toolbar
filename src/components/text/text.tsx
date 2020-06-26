import React, { PropsWithChildren, HTMLProps } from "react";
import { HtmlTag } from "../../core/editor/types";

export const Text = ({
    children,
    tag: Tag = "p",
    ...restProps
}: PropsWithChildren<{
    tag: HtmlTag,
}> & HTMLProps<HTMLHeadingElement | HTMLParagraphElement>) => {
    return (
        <Tag {...restProps}>
            {children}
        </Tag>
    );
};
