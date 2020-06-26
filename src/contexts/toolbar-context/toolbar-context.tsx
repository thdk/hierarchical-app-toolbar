import React, { useCallback, useMemo } from "react";
import { ReactNode } from "react";
import { useReducer } from "react";

export type NavigatorItem = {
    button: React.ReactNode;
    content?: React.ReactNode;
    parent?: string;
    id: string;
    navigate?: boolean;
    showSiblings?: boolean;
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
    allPaths: NavigatorItem[],
    navigationContent: React.ReactNode | (() => void),
    navigationTrail: (string | undefined)[],
    reset: (items: NavigatorItem[]) => void,
    add: (items: NavigatorItem[]) => void,
    get: (path: string) => NavigatorItem,
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

type ToolbarAction =
    { type: "navigate", payload: { id: string | undefined } } |
    { type: "close-content" } |
    { type: "reset", payload: { items: NavigatorItem[] } } |
    { type: "add", payload: { items: NavigatorItem[] } }
    ;

type ToolbarState = {
    trail: (string | undefined)[];
    content: ReactNode | undefined;
    active: string | undefined;
    paths: Map<string, NavigatorItem>;
    navigation: NavigatorItem[];
}


const activeReducer = (state: ToolbarState, action: ToolbarAction) => {
    switch (action.type) {
        case "navigate": {

            return action.payload.id;
        }
        case "close-content":
            return undefined;
        case "reset":
            return undefined;
        default:
            return state.active;
    }
};

const trailReducer = (state: ToolbarState, action: ToolbarAction) => {
    switch (action.type) {
        case "navigate":
            return getBreadcrumbs(
                state.paths,
                action.payload.id,
                {
                    includeCurrent: Array.from(state.paths.values())
                        .some(p => p.parent === action.payload.id),
                },
            );
        case "reset":
            return [undefined];
        default:
            return state.trail;
    }
};

const contentReducer = (state: ToolbarState, action: ToolbarAction) => {
    switch (action.type) {
        case "navigate": {
            const nextPath = action.payload.id !== undefined
                ? state.paths.get(action.payload.id)
                : undefined;

            return nextPath
                ? nextPath.content
                : undefined;
        }
        case "close-content":
            return undefined;
        case "reset":
            return undefined;
        default:
            return state.content;
    }
};

const pathsReducer = (state: ToolbarState, action: ToolbarAction) => {
    switch (action.type) {
        case "reset": {
            return new Map(action.payload.items.map(i => [i.id, i]));
        }
        case "add": {
            const newPaths = new Map(state.paths);
            action.payload.items.forEach(item => newPaths.set(item.id, item));
            return newPaths;
        }
        default:
            return state.paths;
    }
};

const navigationReducer = (state: ToolbarState, action: ToolbarAction) => {
    switch (action.type) {
        case "navigate": {
            if (action.payload.id === state.active) {
                return state.navigation;
            }

            const paths = Array.from(state.paths.values());
            const target = action.payload.id && state.paths.get(action.payload.id);
            if (!target) {
                return paths
                    .filter(p => !p.parent);
            }

            const children = Array.from(state.paths.values())
                .filter(path => path.parent === action.payload.id);

            return children.length
                ? children
                : paths.filter(p => p.parent === target.parent);

        }
        case "reset": {
            return action.payload.items
                .filter(path => path.parent === undefined);
        }
        default:
            return state.navigation;
    }
};

const toolbarReducer = (state: ToolbarState, action: ToolbarAction): ToolbarState => {
    return {
        active: activeReducer(state, action),
        trail: trailReducer(state, action),
        content: contentReducer(state, action),
        paths: pathsReducer(state, action),
        navigation: navigationReducer(state, action),
    };
};

export const NavigationProvider = ({
    children,
}: React.PropsWithChildren<{
    paths: NavigatorItem[],
}>) => {
    const [{
        active,
        content,
        trail,
        paths,
        navigation,
    }, dispatch] = useReducer<typeof toolbarReducer>(toolbarReducer, {
        trail: [undefined],
        paths: new Map(),
        content: null,
        active: undefined,
        navigation: [],
    });

    const allPaths = useMemo(() => {
        return Array.from(paths.values());
    }, [paths]);

    const get = useCallback((path: string) => {
        const item = paths.get(path);
        if (!item) {
            throw new Error("No toolbar item found for " + path);
        }

        return item;
    }, [paths]);

    const navigate = useCallback((path: string | undefined, options: NavigateOptions = {}) => {
        if (path === active) return;

        if (options.allowChild && isChildOf(path, active, paths)) {
            return;
        }

        dispatch({
            type: "navigate",
            payload: {
                id: path,
            },
        });

    }, [paths, active]);

    const navigateUp = useCallback((steps = 1) => {
        dispatch({
            type: "navigate",
            payload: {
                id: trail[trail.length - 1 - steps],
            },
        });
    }, [trail]);

    const navigateDown = useCallback((target: string) => {
        if (target === active) {
            dispatch({
                type: "close-content",
            });
        } else {
            dispatch({
                type: "navigate",
                payload: {
                    id: target,
                },
            });

        }

    }, [active]);

    const reset = useCallback((items: NavigatorItem[]) => {
        dispatch({
            type: "reset",
            payload: {
                items,
            },
        });
    }, []);

    const add = useCallback((items: NavigatorItem[]) => {
        dispatch({
            type: "add",
            payload: {
                items,
            },
        });
    }, []);

    const toolbarContext = {
        allPaths,
        add,
        activePath: active,
        get,
        navigate,
        navigateDown,
        navigateUp,
        navigation,
        navigationContent: content,
        navigationTrail: trail,
        reset,
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
