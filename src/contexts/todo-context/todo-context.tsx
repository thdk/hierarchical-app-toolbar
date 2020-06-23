import React, { useState, useCallback, useEffect } from "react";

export interface ITodo {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

type TodoContextType = {
    todos: ITodo[],
    toggleCompleted: () => void;
    setTodos: (todos: ITodo[]) => void;
    filter: {
        completed: boolean;
    }
};

const TodoContext = React.createContext({} as TodoContextType);

export const TodoProvider = ({
    children,
}: React.PropsWithChildren<{}>) => {
    const [todoFilter, setTodoFilter] = useState({
        completed: true,
    });

    const [todos, setTodos] = useState<ITodo[]>([]);
    const [filteredTodos, setFilteredTodos] = useState<ITodo[]>([]);

    const toggleCompleted = useCallback(() => {
        setTodoFilter({ ...todoFilter, completed: !todoFilter.completed });
    }, [todoFilter]);

    useEffect(() => {
        setFilteredTodos(todoFilter.completed ? todos.filter(todo => !todo.completed) : todos);
    }, [todoFilter, setFilteredTodos, todos]);

    return (
        <TodoContext.Provider value={{
            todos: filteredTodos,
            toggleCompleted,
            setTodos,
            filter: todoFilter,
        }}
        >
            {children}
        </TodoContext.Provider>
    )
};

export const useTodos = () => {
    return React.useContext(TodoContext);
};
