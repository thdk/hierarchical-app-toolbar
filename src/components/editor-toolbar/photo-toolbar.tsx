import React from "react";

import { Button } from "../button";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGoogle, faInstagram, faFlickr } from '@fortawesome/free-brands-svg-icons';
import { PhotoList } from "../photo-list";

const parent = "photo";
export const photoToolbar = [
    {
        button: <Button icon={faFilm} text="Film roll" />,
        action: <PhotoList />,
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