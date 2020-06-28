export type HtmlTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
export interface HtmlData {
    tag: HtmlTag;
    content: React.ReactNode;
    id: string;
    style: Omit<React.CSSProperties, "fontSize" | "letterSpacing">
    & {
        fontSize?: string,
        letterSpacing?: string,
    };
}

export type Photo = {
    title: string;
    thumbnailUrl: string;
};
