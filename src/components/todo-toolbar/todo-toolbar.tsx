import { Button } from "../button";
import React from "react";
import { TodoFilterCompleted } from "../todo-filters";
import { recipes } from "./recipes";
import { faRobot, faUtensils, faListUl, faAmbulance } from "@fortawesome/free-solid-svg-icons";
import { NavigatorItem, useToolbar } from "../../contexts/toolbar-context";
import { useCallback } from "react";
import { useState } from "react";

const RecipesButton = () => {
    const {
        add,
        navigateDown,
    } = useToolbar();

    const [isLoading, setIsLoading] = useState(false);

    const onClick = useCallback(() => {
        setIsLoading(true);
        setTimeout(() => {
            add(recipes);
            setIsLoading(false);
            navigateDown("recipes");
        }, 2000);
    }, [add, navigateDown]);

    return (
        <Button
            icon={isLoading ? faAmbulance : faUtensils}
            text={isLoading ? "Loading..." : "Recipes"}
            onClick={onClick}
        />
    )
};
export const todoToolbar = [
    {
        button: <Button icon={faListUl} text="To do" />,
        content: <TodoFilterCompleted />,
        id: "to do",
    },
    {
        button: <Button icon={faRobot} text="Space robot" />,
        content: <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>,
        id: "robot",
    },
    {
        navigate: false,
        button: <RecipesButton />,
        id: "recipes",
    },
] as NavigatorItem[];
