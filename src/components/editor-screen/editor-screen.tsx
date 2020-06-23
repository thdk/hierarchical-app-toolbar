import React from "react";

import { Editor } from "../editor/editor";
import { Layout } from "../layout";
import { useEffect } from "react";
import { useToolbar } from "../../contexts/toolbar-context";
import { editorToolbar } from "../editor-toolbar";
import { useEditorReducer } from "../../contexts/editor-context";
import { HtmlData } from "../../core/editor/types";


const html = [
    {
        id: "1",
        tag: "h1",
        content: "Heading 1",
        style: {
            textAlign: "left",
            fontSize: "28px",
        },
    },
    {
        id: "2",
        tag: "h2",
        content: "Heading 2",
        style: {
            textAlign: "left",
            fontSize: "22px",
        },
    },
    {
        id: "3",
        tag: "h3",
        content: "Heading 3",
        style: {
            textAlign: "left",
            fontSize: "18px",
        },
    },
] as HtmlData[];

export const EditorScreen = () => {
    const {
        reset,
    } = useToolbar();

    const { state, dispatch } = useEditorReducer();
    const { defaultStyle } = state;

    useEffect(() => {
        reset(editorToolbar);
        return () => {
            reset([]);
        };
    }, [reset]);

    useEffect(() => {
        Promise.resolve(html)
            .then(fetchedHtml => {
                dispatch({
                    type: 'request-html-success',
                    data: fetchedHtml.map(html => {
                        const style = { ...defaultStyle, ...html.style };
                        return { ...html, style };
                    }),
                })
            });
    }, [defaultStyle, dispatch]);

    return (
            <Layout>
                <Editor />
            </Layout>
    );
};
