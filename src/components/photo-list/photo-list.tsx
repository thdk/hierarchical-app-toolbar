import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export const PhotoList = () => {
    const [
        photos,
        setPhotos,
    ] = useState([] as any[]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/photos?albumId=6')
            .then(response => response.json())
            .then(json => {
                console.log({ json });
                setPhotos(json);
            });

    }, [setPhotos]);
    return (
        <>
            {photos.map((p, index) => {
                return (
                    <img key={index} alt={p.title} src={p.thumbnailUrl} />
                )
            })
            }
        </>
    );
};
