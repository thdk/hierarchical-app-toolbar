import React, { useState } from "react";

type ViewContextProps = {
    isMenuOpen: boolean;
    toggleMenu: () => void;
    closeMenu: () => void;
}

const ViewContext = React.createContext({} as ViewContextProps);

export const ViewContextProvider = ({
    children,
}: React.PropsWithChildren<unknown>) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const context = {
        isMenuOpen,
        toggleMenu: () => setIsMenuOpen(!isMenuOpen),
        closeMenu: () => setIsMenuOpen(false),
    };

    return (
        <ViewContext.Provider value={context}>
            {children}
        </ViewContext.Provider>
    );
};

export const useViewContext = () => {
    return React.useContext(ViewContext);
};
