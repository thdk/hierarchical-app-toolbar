import React, { HTMLProps } from "react";

import "./slider.css";

export const Slider = ({
    min,
    max,
    value,
    ...restProps
}: {
    min: number,
    max: number,
    value: number,
}  & HTMLProps<HTMLInputElement>) => {

    return (
        <div className="slider">
            <input
                min={min}
                max={max}
                type="range"
                value={value}
                {...restProps}
            />
        </div>
    );
};
