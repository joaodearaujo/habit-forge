import { useState } from "react";

export function useExpand(initialState: boolean) {
    const [isExpanded, setIsExpanded] = useState(initialState);

    const controlExpand = () => {
    setIsExpanded(prev => !prev);
    };

    return { controlExpand, isExpanded }
}