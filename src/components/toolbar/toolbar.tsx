import React from "react";
import { useToolbar } from "../../contexts/toolbar-context";
import { ToolbarItem } from "../toolbar-item";

import "./toolbar.css";
import classNames from "classnames";

export const Toolbar = () => {
    const {
        activePath,
        navigationContent,
        navigation,
    } = useToolbar();

    const cssClass = classNames([
        "toolbar",
        {
            "toolbar--closed": !navigation.length,
        },
    ]);

    return (
        <div className={cssClass}>
            {
                navigationContent ?
                    <div className="toolbar__content">
                        {navigationContent}
                    </div>
                    : null
            }

            <div className="toolbar__items">
                {
                    navigation.map(({ button, id, action }) => (
                        <ToolbarItem
                            key={id}
                            itemId={id}
                            isActive={!!action && activePath === id}
                        >
                            {button}
                        </ToolbarItem>
                    ))
                }
            </div>
        </div>
    );
};
