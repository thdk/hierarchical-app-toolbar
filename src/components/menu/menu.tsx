import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import "./menu.css";
import { useViewContext } from "../../contexts/view-context";
import { useCallback } from "react";

export const Menu = () => {
    const { isMenuOpen } = useViewContext();

    const { closeMenu } = useViewContext();

    const onClick = useCallback((e: React.MouseEvent) => {
        closeMenu();
    }, [closeMenu]);

    const cssClass = classNames([
        "menu",
        {
            "menu--open": isMenuOpen,
        },
    ]);

    return (
        <div className={cssClass}>
            <Link to="/" onClick={onClick}>Home</Link>
            <Link to="/editor" onClick={onClick}>Editor</Link>
            <Link to="/todos" onClick={onClick}>To do</Link>
        </div>
    )
};
