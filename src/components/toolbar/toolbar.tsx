import React from "react";
import { useToolbar } from "../../contexts/toolbar-context";
import { ToolbarItem } from "../toolbar-item";

import "./toolbar.css";
import classNames from "classnames";

export const Toolbar = () => {
    const toolbar = useToolbar();
    const {
        activePath,
        navigationContent,
        navigation,
        navigateDown,
    } = toolbar;

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
                    navigation.map(({ button, id, content, navigate = true }) => (
                        <ToolbarItem
                            key={id}
                            isActive={!!content && activePath === id}
                            onClick={navigate ? () => navigateDown(id) : undefined}
                        >
                            {button}
                        </ToolbarItem>
                    ))
                }
            </div>
        </div>
    );
};
