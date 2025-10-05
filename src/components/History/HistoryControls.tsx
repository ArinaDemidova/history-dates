import React from 'react';
import ArrowIcon from '../../../src/assets/images/arrow-left.svg';

type HistoryDatesProps = {
    activeInterval: number;
    countIntervals: number;
    isAnimated: boolean;
    handlePrev : () => void;
    handleNext : () => void;
};

const HistoryControls = ({
    activeInterval,
    countIntervals,
    handlePrev,
    handleNext,
    isAnimated
}: HistoryDatesProps) => {
    return (
        <div className={'history__interval-controls'}>
            <div className={'history__interval-counter'}>0{activeInterval}/0{countIntervals}</div>
            <div className={'history__interval-buttons'}>
                <div
                    className={`history__interval-button ${activeInterval === 1 ? 'history__interval-button-inactive' : ''}`}
                    onClick={() => !isAnimated && handlePrev()}
                >
                    <ArrowIcon className="history__button-icon"/>
                </div>
                <div
                    className={`history__interval-button history__interval-button-right ${activeInterval === countIntervals ? 'history__interval-button-inactive' : ''}`}
                    onClick={() => !isAnimated && handleNext()}
                >
                    <ArrowIcon className="history__button-icon"/>
                </div>
            </div>
        </div>
    );
};

export default HistoryControls;