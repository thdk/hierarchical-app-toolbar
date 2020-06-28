import React, { HTMLProps } from "react";

import "./toolbar-button.css";
import classNames from "classnames";

export const ToolbarButton = ({
    children,
    isActive = false,
    className,
    ...restProps
}: HTMLProps<HTMLDivElement> & {
    isActive?: boolean,
}) => {

    const cssClass = classNames([
        className,
        "toolbar-button",
        {
            "toolbar-button--active": isActive,
        },
    ]);

    return (
        <div
            className={cssClass}
            {...restProps}
        >
            {children}
        </div>
    );
};
