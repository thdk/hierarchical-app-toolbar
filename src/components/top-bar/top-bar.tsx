import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronLeft, faBars, faEllipsisV, faQuestion } from "@fortawesome/free-solid-svg-icons";

import { NavigationBreadcrumbs } from "../toolbar-breadcrumbs";
import { useToolbar } from "../../contexts/toolbar-context";
import { useViewContext } from "../../contexts/view-context";
import "./top-bar.css";

library.add(faChevronLeft, faEllipsisV, faBars, faQuestion);

const TopBarNavigation = () => {
    const {
        navigationTrail,
        navigateUp,
    } = useToolbar();

    const { toggleMenu } = useViewContext();

    return (
        navigationTrail.length > 1
            ? <FontAwesomeIcon
                icon="chevron-left"
                onClick={() => navigateUp()}
            />
            : <FontAwesomeIcon
                icon={faBars}
                onClick={toggleMenu}
            />
    );
}

const TopBarActions = () => {
    const {
        navigationTrail,
    } = useToolbar();

    return (
        navigationTrail.length > 1
            ? <FontAwesomeIcon
                icon="question"
            />
            : <FontAwesomeIcon
                icon={"ellipsis-v"}
            />
    );
}

export const TopBar = () => {
    const {
        navigationTrail,
    } = useToolbar();

    const cssClass = classNames([
        "top-bar",
        {
            "top-bar--contextual": navigationTrail.length > 1,
        },
    ]);

    return (
        <div className={cssClass}>
            <div className="top-bar__left">
                <TopBarNavigation />
            </div>

            <div className="top-bar__center">
                <NavigationBreadcrumbs />
            </div>

            <div className="top-bar__right">
                <TopBarActions />
            </div>
        </div>
    );
}
