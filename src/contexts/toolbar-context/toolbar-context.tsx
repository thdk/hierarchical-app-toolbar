import React, { useState, useCallback, isValidElement } from "react";

export type NavigatorItem = {
    button: React.ReactNode;
    action?: React.ReactNode | (() => void);
    parent?: string;
    id: string;
    wrapper?: (component: React.ReactNode) => React.ReactElement;
}

type NavigateOptions = {
    allowChild?: boolean,
};

export interface ToolbarContext {
    activePath?: string;
    navigateDown: (id: string) => void,
    navigateUp: (steps?: number) => void,
    navigate: (id: string | undefined, options?: NavigateOptions) => void,
    navigation: NavigatorItem[],
    siblings: NavigatorItem[],
    navigationContent: React.ReactNode | (() => void),
    navigationTrail: (string | undefined)[],
    reset: (items: NavigatorItem[]) => void,
    wrapper?: (component: React.ReactNode) => React.ReactElement,
}

function getBreadcrumbs(
    paths: Map<string, NavigatorItem>,
    current: string | undefined,
    { includeCurrent = true } = {},
): (string | undefined)[] {
    if (!current) return [undefined];

    const navigation = paths.get(current);
    if (!navigation || !navigation.parent) {
        return includeCurrent
            ? [undefined, current]
            : [undefined];
    }

    const breadcrumbs = getBreadcrumbs(paths, navigation.parent, {
        includeCurrent: true
    });

    return includeCurrent
        ? [...breadcrumbs, current]
        : breadcrumbs;
}

function isChildOf(path: string | undefined, currentPath: string | undefined, paths: Map<string, NavigatorItem>): boolean {
    if (!currentPath) {
        return false;
    }

    const current = paths.get(currentPath);

    if (!current) {
        return false;
    }

    if (!current.parent) {
        return false;
    }

    if (current.parent && current.parent === path) {
        return true;
    }

    return isChildOf(path, current.parent, paths);
}

const ToolbarContext = React.createContext({} as ToolbarContext);

export const NavigationProvider = ({
    children,
}: React.PropsWithChildren<{
    paths: NavigatorItem[],
}>) => {
    const [toolbarTrail, setToolbarTrail] = useState<(string | undefined)[]>([undefined]);
    const [toolbarContent, setToolbarcontent] = useState<React.ReactNode | undefined>(undefined);
    const [activePath, setActivePath] = useState<string | undefined>(undefined);

    const [toolbarPaths, setToolbarPaths] = useState<Map<string, NavigatorItem>>(
        new Map(),
    );

    const currentPath = toolbarTrail.length > 1
        ? toolbarTrail[toolbarTrail.length - 1]
        : undefined;

    const allPaths = Array.from(toolbarPaths.values());
    const navigation = allPaths
        .filter(path => path.parent === currentPath);

    if (!navigation) {
        throw new Error("No navigation items have been set up");
    }

    const current = allPaths.find(p => p.id === currentPath);

    let siblings: NavigatorItem[] = [];
    if (current && current.parent) {
        siblings = allPaths.filter(p => p.parent === current.parent);
    }

    const navigate = useCallback((path: string | undefined, options: NavigateOptions = {}) => {
        if (path === activePath) return;

        if (options.allowChild && isChildOf(path, activePath, toolbarPaths)) {
            return;
        }

        setActivePath(path);

        if (path) {
            const nextNavigation = toolbarPaths.get(path);
            if (!nextNavigation) {
                throw new Error("No navigation items have been set up");
            }

            const { action } = nextNavigation;

            if (isValidElement(action)) {
                setToolbarcontent(action);
            } else {
                setToolbarcontent(undefined);
            }
        } else {
            // navigate to root
            setToolbarcontent(undefined);
        }

        setToolbarTrail(
            getBreadcrumbs(
                toolbarPaths,
                path,
                {
                    includeCurrent: Array.from(toolbarPaths.values()).some(p => p.parent === path),
                },
            ),
        );
    }, [toolbarPaths, activePath]);

    const navigateUp = useCallback((steps = 1) => {
        if (toolbarTrail && toolbarTrail.length > steps) {
            toolbarTrail.splice(-1, steps);
            setToolbarTrail([...toolbarTrail]);
            setToolbarcontent(undefined);
            setActivePath(undefined);
        }
    }, [toolbarTrail]);

    const navigateDown = useCallback((parent: string) => {
        if (toolbarTrail.indexOf(parent) !== -1) {
            navigateUp();
        } else if (parent === activePath) {
            setActivePath(undefined);
            setToolbarcontent(undefined);
        } else {
            navigate(parent);
        }

    }, [activePath, navigate, navigateUp, toolbarTrail]);

    const reset = useCallback((items: NavigatorItem[]) => {
        setActivePath(undefined);
        setToolbarPaths(new Map(items.map(path => [path.id, path])));
        setToolbarcontent(undefined);
        setToolbarTrail([undefined]);
    }, [setToolbarcontent]);

    const toolbarContext = {
        activePath,
        navigate,
        navigateDown,
        navigateUp,
        navigation,
        navigationContent: toolbarContent,
        navigationTrail: toolbarTrail,
        reset,
        siblings,
    };
    return (
        <ToolbarContext.Provider value={toolbarContext}>
            {children}
        </ToolbarContext.Provider>
    )
};

export const useToolbar = () => {
    return React.useContext(ToolbarContext);
};
