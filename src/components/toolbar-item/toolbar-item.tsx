import React from "react";
import { useToolbar } from "../../contexts/toolbar-context";

import "./navigation-item.css";
import classNames from "classnames";

export const ToolbarItem = ({
    itemId,
    children,
    isActive = false,
}: React.PropsWithChildren<{
    itemId: string,
    isActive?: boolean,
}>) => {
    const {
        navigateDown,
    } = useToolbar();

    const cssClass = classNames([
        "navigation-item",
        {
            "navigation-item--active": isActive,
        },
    ]);

    return (
        <div
            onClick={navigateDown.bind(null, itemId)}
            className={cssClass}
        >
            {children}
        </div>
    );
};
