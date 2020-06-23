import React, { useEffect } from "react";

import { TodoList } from "../todo-list";
import { Layout } from "../layout";
import { useToolbar } from "../../contexts/toolbar-context";
import { todoToolbar } from "../todo-toolbar";

export const TodosScreen = () => {
    const {
        reset,
    } = useToolbar();
    useEffect(() => {
        reset(todoToolbar);
        return () => {
            reset([]);
        };
    }, [reset]);

    return (
            <Layout>
                <TodoList />
            </Layout>
    );
}
