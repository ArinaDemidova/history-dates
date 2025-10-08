import React, {forwardRef, RefObject} from 'react';
import {HistoryInterval} from "../../types/History/HistoryInterval";

type HistoryDatesProps = {
    interval: HistoryInterval;
    yearStartRef?: RefObject<HTMLDivElement | null>;
    yearEndRef?: RefObject<HTMLDivElement | null>;
};

const HistoryDates = forwardRef(
    ({ interval, yearStartRef, yearEndRef }: HistoryDatesProps, _ref) => {
    return (
        <div className='history__dates'>
            <div className='history__date' ref={yearStartRef}>{interval.yearStart}</div>
            <div className='history__date' ref={yearEndRef}>{interval.yearEnd}</div>
        </div>
    );
});

export default HistoryDates;