import React, {forwardRef, RefObject} from 'react';
import {HistoryInterval} from "../../types/History/HistoryInterval";
import {PointStyles} from "../../types/History/PointStyles";

interface HistoryCircleProps {
    activeInterval: number;
    isAnimated: boolean;
    setActiveByIndex: (index: number) => void;
    intervals: HistoryInterval[];
    discRef?: RefObject<HTMLDivElement | null>;
    controlsRef?: RefObject<HTMLDivElement | null>;
    pointsStyles : RefObject<PointStyles[]>
}

const HistoryCircle = forwardRef(
    ({ intervals, activeInterval, isAnimated, discRef, controlsRef, setActiveByIndex, pointsStyles }: HistoryCircleProps, _ref) => {
    return <>
        <div className={'history__disc'} ref={discRef}></div>
        <div className={'history__controls'} ref={controlsRef}>
            {
                intervals.map((interval, index) => {

                    return (
                        <div
                            style={pointsStyles.current[index]}
                            className={`history__control history__control-${index} ${index + 1 === activeInterval ? 'history__control-active' : ''}`}
                            key={index}
                            onClick={() => !isAnimated && setActiveByIndex(index + 1)}
                        >
                            <span className={'history__control-number'}>{index + 1}</span>
                            <span className={'history__control-name'}>{interval.name}</span>
                        </div>
                    );
                })
            }
        </div>
    </>
});

export default HistoryCircle;