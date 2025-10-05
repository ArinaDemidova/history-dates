import { useState, useCallback } from 'react';
import {HistoryInterval} from "../types/History/HistoryInterval";

export function useIntervalNavigator(intervals: HistoryInterval[], initialIndex: number) {
    const [activeInterval, setActiveInterval] = useState(initialIndex);

    const handleNext = useCallback(() => {
        setActiveInterval((prev) => prev + 1);
    }, [intervals]);

    const handlePrev = useCallback(() => {
        setActiveInterval((prev) => prev - 1);
    }, [intervals]);

    const setActiveByIndex = useCallback((newIndex: number) => {
        setActiveInterval(newIndex);
    }, []);

    return { activeInterval, handleNext, handlePrev, setActiveByIndex };
}