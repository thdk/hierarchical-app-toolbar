import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAlignCenter, faAlignJustify, faAlignLeft, faAlignRight } from "@fortawesome/free-solid-svg-icons";
import { useHtmlReducer } from "../../../contexts/editor-context";
import { useCallback } from "react";
import { selectSelectedHtmlData } from "../../../core/editor/selector";
import { Slider } from "../../slider";

library.add(faAlignCenter, faAlignJustify, faAlignLeft, faAlignRight);

export const FontSizeSlider = () => {
    const { state, dispatch } = useHtmlReducer();
    const selectedHtml = selectSelectedHtmlData(state);
    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!selectedHtml) {
            return;
        }

        const { style, id } = selectedHtml;

        dispatch({
            type: "update-html",
            data: {
                style: {
                    ...style,
                    fontSize: e.target.value + "px",
                },
            },
            id,
        },
        )
    }, [dispatch, selectedHtml]);


    if (!selectedHtml) {
        return <p>Select some text first</p>
    }

    const { style } = selectedHtml;

    const fontSize = +(style.fontSize || "").replace(/[A-Za-z]/g, '');

    return (
        <Slider
            onChange={onChange}
            min={1}
            max={50}
            value={fontSize}
        />
    );
};
