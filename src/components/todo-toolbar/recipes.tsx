import { Button } from "../button";
import React from "react";

const parent = "recipes";
export const recipes = [
    {
        button: <Button icon="fish" text="Great fish" />,
        parent,
        id: "fish",
        navigate: false,
    },
    {
        button: <Button icon="stroopwafel" text="Belgian waffle" />,
        parent,
        id: "waffle",
        navigate: false,
    },
    {
        button: <Button icon="pizza-slice" text="Pizza" />,
        parent,
        id: "pizza",
        navigate: false,
    },
]