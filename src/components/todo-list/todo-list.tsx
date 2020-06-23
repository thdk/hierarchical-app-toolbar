import React, { useEffect } from "react";
import { useTodos } from "../../contexts/todo-context";

export const TodoList = () => {
    const {
        todos,
        setTodos,
    } = useTodos();

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => {
                console.log({ json });
                setTodos(json);
            });

    }, [setTodos]);

    if (!todos) return <></>;
    return (
        <div className="todo-list">
            {
                todos
                    .map((todo, index) => {
                        return (
                            <div
                                className="todo"
                                key={todo.id + index}
                            >
                                {todo.completed ? "V" : "X"}
                        -
                                {todo.title}
                            </div>
                        );
                    })
            }
        </div>
    )
};
