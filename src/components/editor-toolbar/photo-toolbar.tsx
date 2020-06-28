import React from "react";

import { Button } from "../button";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGoogle, faInstagram, faFlickr } from '@fortawesome/free-brands-svg-icons';
import { PhotoList } from "../photo-list";
import { useCallback } from "react";
import { useToolbar } from "../../contexts/toolbar-context";
import { usePhotosReducer } from "../../contexts/editor-context";
import { useState } from "react";
import { Photo } from "../../core/editor/types";

const FilmrollButton = () => {
    const { dispatch } = usePhotosReducer();
    const [isLoading, setIsLoading] = useState(false);

    const {
        navigateDown,
    } = useToolbar();

    const onClick = useCallback(() => {
        setIsLoading(true);
        fetch('https://jsonplaceholder.typicode.com/photos?albumId=6')
            .then(response => response.json())
            // Add some delay...
            .then(json => new Promise<Photo[]>((resolve) => setTimeout(() => {
                resolve(json);
            }, 1000)))
            .finally(() => setIsLoading(false))
            .then(json => {
                dispatch({
                    type: "add",
                    payload: json,
                });
                navigateDown("filmroll");
            })
    }
        , [dispatch, navigateDown]);

    return (
        <Button
            icon={faFilm}
            text={isLoading ? "Loading..." : "Film roll"}
            onClick={onClick}
        />
    );
};

const parent = "photo";
export const photoToolbar = [
    {
        button: <FilmrollButton />,
        content: <PhotoList />,
        id: "filmroll",
        parent,
    },
    {
        button: <Button icon={faFacebook} text="Facebook" />,
        id: "facebook",
        parent,
    },
    {
        button: <Button icon={faGoogle} text="Google" />,
        id: "google",
        parent,
    },
    {
        button: <Button icon={faFlickr} text="Flickr" />,
        id: "flickr",
        parent,
    },
    {
        button: <Button icon={faInstagram} text="Instagram" />,
        id: "instagram",
        parent,
    },
];