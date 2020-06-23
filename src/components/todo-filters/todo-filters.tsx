import React from "react";
import { useTodos } from "../../contexts/todo-context";

import "./todo-filters.css";

export const TodoFilterCompleted = () => {
    const { toggleCompleted, filter: { completed } } = useTodos();

    return (
        <div
            className="todo-filter todo-filter-completed"
        >
            <label>Hide completed todos</label>
            <input
                type="checkbox"
                checked={completed}
                onChange={toggleCompleted}
            ></input>
        </div>
    )
};