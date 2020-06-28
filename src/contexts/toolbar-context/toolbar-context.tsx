import React, { useCallback, useMemo } from "react";
import { ReactNode } from "react";
import { useReducer } from "react";

export type ToolbarButton = {
    button: React.ReactNode;
    content?: React.ReactNode;
    parent?: string;
    id: string;
    showSiblings?: boolean;
    navigate?: boolean;
    render?: (toolbar: ToolbarContext, id: string, button: React.ReactNode) => ReactNode;
}

type NavigateOptions = {
    allowChild?: boolean,
};

export interface ToolbarContext {
    activePath?: string;
    navigateDown: (id: string) => void,
    navigateUp: (steps?: number) => void,
    navigate: (id: string | undefined, options?: NavigateOptions) => void,
    buttons: ToolbarButton[],
    allPaths: ToolbarButton[],
    navigationContent: React.ReactNode | (() => void),
    navigationTrail: (string | undefined)[],
    reset: (items: ToolbarButton[]) => void,
    add: (items: ToolbarButton[]) => void,
    get: (path: string) => ToolbarButton,
}

function getBreadcrumbs(
    paths: Map<string, ToolbarButton>,
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

function isChildOf(path: string | undefined, currentPath: string | undefined, paths: Map<string, ToolbarButton>): boolean {
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
    { type: "reset", payload: { items: ToolbarButton[] } } |
    { type: "add", payload: { items: ToolbarButton[] } }
    ;

type ToolbarState = {
    trail: (string | undefined)[];
    content: ReactNode | undefined;
    active: string | undefined;
    paths: Map<string, ToolbarButton>;
    buttons: ToolbarButton[];
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

const buttonsReducer = (state: ToolbarState, action: ToolbarAction) => {
    switch (action.type) {
        case "navigate": {
            if (action.payload.id === state.active) {
                return state.buttons;
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
            return state.buttons;
    }
};

const toolbarReducer = (state: ToolbarState, action: ToolbarAction): ToolbarState => {
    return {
        active: activeReducer(state, action),
        trail: trailReducer(state, action),
        content: contentReducer(state, action),
        paths: pathsReducer(state, action),
        buttons: buttonsReducer(state, action),
    };
};

export const NavigationProvider = ({
    children,
}: React.PropsWithChildren<{
    paths: ToolbarButton[],
}>) => {
    const [{
        active,
        content,
        trail,
        paths,
        buttons,
    }, dispatch] = useReducer<typeof toolbarReducer>(toolbarReducer, {
        trail: [undefined],
        paths: new Map(),
        content: null,
        active: undefined,
        buttons: [],
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

    const reset = useCallback((items: ToolbarButton[]) => {
        dispatch({
            type: "reset",
            payload: {
                items,
            },
        });
    }, []);

    const add = useCallback((items: ToolbarButton[]) => {
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
        buttons,
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
