import React, { HTMLProps } from "react";

import "./navigation-item.css";
import classNames from "classnames";

export const ToolbarItem = ({
    children,
    isActive = false,
    className,
    ...restProps
}: HTMLProps<HTMLDivElement> & {
    isActive?: boolean,
}) => {

    const cssClass = classNames([
        className,
        "navigation-item",
        {
            "navigation-item--active": isActive,
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
