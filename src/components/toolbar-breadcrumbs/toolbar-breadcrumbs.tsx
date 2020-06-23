import React from "react";

import { useToolbar } from "../../contexts/toolbar-context";

import "./toolbar-breadcrumbs.css";

const Seperator = ({ isLast = false }: { isLast?: boolean }) => {
    return isLast
        ? <></>
        : <span> - </span>;
};

export const NavigationBreadcrumbs = () => {
    const {
        navigateUp,
        navigationTrail,
    } = useToolbar();


    const onBackClick = (e: React.MouseEvent, steps = 1) => {
        e.preventDefault();
        navigateUp(steps);
    };

    return (
        <div className="navigation-breadcrumbs">
            {navigationTrail.map((item, index) => {
                const isLast = index === navigationTrail.length - 1;
                return (
                    <span key={index}>
                        {isLast
                            ? <span>{item || "Main"}</span>
                            : <a // eslint-disable-line jsx-a11y/anchor-is-valid
                                onClick={e => onBackClick(e, navigationTrail.length - 1 - index)}
                                href="#"
                            >
                                {item || "Main"}
                            </a>
                        }
                        <Seperator
                            isLast={isLast}
                        />
                    </span>
                );
            })}
        </div>
    );
};
