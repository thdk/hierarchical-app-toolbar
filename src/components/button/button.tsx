import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import "./button.css";

export const Button = ({
    text,
    icon,
    ...restProps
}: {
    text: string,
    icon: IconProp,
} & React.HTMLProps<HTMLDivElement>) => {
    return (
        <div
            className="button"
            {...restProps}
        >
            <FontAwesomeIcon
                className="button__icon"
                icon={icon}
            />
            <span
                className="navigation-button__text"
            >
                {text}
            </span>
        </div>
    );
};
