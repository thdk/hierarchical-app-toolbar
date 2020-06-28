import React, { PropsWithChildren } from "react";
import { TopBar } from "../top-bar";
import { Toolbar } from "../toolbar";
import { Menu } from "../menu";

import "./layout.css";
import { ToolbarSiblings } from "../toolbar/toolbar-siblings";


export const Layout = ({
    children,
}: PropsWithChildren<unknown>) => {
    return (
        <div className="app">
            <TopBar />
            <aside>
            <Menu />
            </aside>
            <div className="app__body">
                {children}
            </div>
            <Toolbar />
            <ToolbarSiblings/>
        </div>
    );
};
