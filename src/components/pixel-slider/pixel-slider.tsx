import React, { useCallback, CSSProperties } from "react";
import { useHtmlReducer } from "../../contexts/editor-context";
import { selectSelectedHtmlData } from "../../core/editor/selector";
import { Slider } from "../slider";

export const PixelSlider = ({
    cssProperty,
}: {
    cssProperty: keyof CSSProperties
}) => {
    const { state, dispatch } = useHtmlReducer();
    const selectedHtml = selectSelectedHtmlData(state);
    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!selectedHtml) {
            return;
        }

        const { style, id } = selectedHtml;

        const newStyle = {
            ...style,
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (newStyle as unknown as any)[cssProperty] = e.target.value + "px";

        dispatch({
            type: "update-html",
            data: {
                style: newStyle,
            },
            id,
        },
        )
    }, [dispatch, selectedHtml, cssProperty]);


    if (!selectedHtml) {
        return <p>Select some text first</p>
    }

    const { style } = selectedHtml;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = +((style as unknown as any)[cssProperty] || "").replace(/[A-Za-z]/g, '');

    return (
        <Slider
            onChange={onChange}
            min={1}
            max={50}
            value={value}
        />
    );
};