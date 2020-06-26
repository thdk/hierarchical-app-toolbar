import React from "react";
import { usePhotosReducer } from "../../contexts/editor-context";

export const PhotoList = () => {
    const { state: { photos } } = usePhotosReducer();

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
