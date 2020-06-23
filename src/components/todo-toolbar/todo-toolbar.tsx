import { Button } from "../button";
import React from "react";
import { TodoFilterCompleted } from "../todo-filters";
import { recipes } from "./recipes";
import { faRobot, faUtensils, faListUl } from "@fortawesome/free-solid-svg-icons";

export const todoToolbar = [
    {
        button: <Button icon={faListUl} text="To do" />,
        action: <TodoFilterCompleted />,
        id: "to do",
    },
    {
        button: <Button icon={faRobot} text="Space robot" />,
        action: <p>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                </p>,
        id: "robot",
    },
    {
        button: <Button icon={faUtensils} text="Recipes" />,
        id: "recipes",
    },
    ...recipes,
];
