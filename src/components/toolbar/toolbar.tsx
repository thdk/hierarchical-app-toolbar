import React from "react";
import { useToolbar } from "../../contexts/toolbar-context";
import { ToolbarButton } from "../toolbar-button";

import "./toolbar.css";
import classNames from "classnames";

export const Toolbar = () => {
    const toolbar = useToolbar();
    const {
        activePath,
        navigationContent,
        buttons,
        navigateDown,
    } = toolbar;

    const cssClass = classNames([
        "toolbar",
        {
            "toolbar--closed": !buttons.length,
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
                    buttons.map((
                        {
                            button,
                            id,
                            content,
                            navigate = true,
                        }) => (
                            <ToolbarButton
                                key={id}
                                isActive={!!content && activePath === id}
                                onClick={navigate ? () => navigateDown(id) : undefined}
                            >
                                {button}
                            </ToolbarButton>
                        ))
                }
            </div>
        </div>
    );
};
