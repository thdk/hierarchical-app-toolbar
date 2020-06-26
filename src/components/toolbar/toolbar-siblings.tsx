import React from "react";
import { useToolbar } from "../../contexts/toolbar-context";
import { ToolbarItem } from "../toolbar-item";

export const ToolbarSiblings = () => {
    const {
        navigationTrail,
        get,
        navigate,
        allPaths,
    } = useToolbar();

    const current = navigationTrail[navigationTrail.length - 1];

    const parentItem = current && get(current);

    const siblings = parentItem && parentItem.showSiblings
        ? allPaths.filter(p => p.parent === parentItem.parent)
        : undefined;

    return siblings
        ? (
            <div className="toolbar-siblings">
                {
                    siblings.map(({ button, id
                    }) => (
                            <ToolbarItem
                                key={id}
                                isActive={navigationTrail.indexOf(id) !== -1}
                                onClick={() => navigate(id)}
                            >
                                {button}
                            </ToolbarItem>
                        ))
                }
            </div>
        )
        : <></>;
};
