import React from "react";
import { useToolbar } from "../../contexts/toolbar-context";
import { ToolbarItem } from "../toolbar-item";

export const ToolbarSiblings = () => {
    const {
        navigationTrail,
        siblings,
     } = useToolbar();

    return siblings.length
        ? (
            <div className="toolbar-siblings">
                {
                    siblings.map(({ button, id }) => (
                        <ToolbarItem
                            key={id}
                            itemId={id}
                            isActive={navigationTrail.indexOf(id) !== -1}
                        >
                            {button}
                        </ToolbarItem>
                    ))
                }
            </div>
        )
        : <></>;
};
