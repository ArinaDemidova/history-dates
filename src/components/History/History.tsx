import {HistoryInfo} from '../../types/History/HistoryInfo';
import React, {useState, useRef, useEffect} from 'react';
import {useIntervalNavigator} from "../../hooks/useIntervalNavigator";

import gsap from 'gsap';
import {useGSAP} from '@gsap/react';

import './history.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import HistoryTitle from "./HistoryTitle";
import HistoryDates from "./HistoryDates";
import HistoryControls from "./HistoryControls";
import HistorySlider from "./HistorySlider";
import HistoryCircle from "./HistoryCircle";
import {PointStyles} from "../../types/History/PointStyles";

interface HistoryProps {
    info: HistoryInfo
}

export default function History({info}: HistoryProps) {

    const countIntervals = info.intervals.length;
    const angleStep = (Math.PI * 2) / countIntervals;
    const angleStepDegrees = angleStep * (180 / Math.PI);

    const { activeInterval, handleNext, handlePrev, setActiveByIndex } = useIntervalNavigator(info.intervals, 1);

    const [isFirstRun, setIsFirstRun] = useState<boolean>(true);
    const [isAnimated, setIsAnimated] = useState<boolean>(false);

    const discRef = useRef<HTMLDivElement|null>(null);

    const yearStartRef = useRef<HTMLDivElement | null>(null);
    const yearEndRef = useRef<HTMLDivElement | null>(null);

    const controlsRef = useRef<HTMLDivElement|null>(null);

    const pointsStyles = useRef<PointStyles[]>([]);
    const currentRotation = useRef<number>(0);
    const prevInterval = useRef<number>(1);
    const centerDiscX = useRef<number>(0);

    gsap.registerPlugin(useGSAP);

    useEffect(() => {

        const circleWidth = discRef.current!.offsetWidth;
        const circleHeight = discRef.current!.offsetHeight;
        const radius = Math.min(circleWidth, circleHeight) / 2;

        const centerX = circleWidth / 2 - 3;
        const centerY = circleHeight / 2 - 3;

        const discRect = discRef.current!.getBoundingClientRect();
        centerDiscX.current = discRect.left + discRect.width / 2;

        pointsStyles . current = info.intervals.map((interval, index) => {

            const currentAngle = -Math.PI / 3 + index * (Math.PI * 2) / info.intervals.length;

            return {
                left: `${centerX + Math.cos(currentAngle) * radius}px`,
                top: `${centerY + Math.sin(currentAngle) * radius}px`,
                opacity: 1,
            };
        })

        setIsFirstRun(false);
    }, []);

    useGSAP(() => {

        if (isFirstRun) return;

        let abc = Math.abs(activeInterval - prevInterval.current);
        let reminder = countIntervals - abc;

        let angle = Math.ceil(Math.min(abc, reminder) * angleStepDegrees);

        let activeControlRect = controlsRef.current!.querySelector(`.history__control:nth-child(${activeInterval})`)!.getBoundingClientRect();

        angle = activeControlRect.left < centerDiscX.current ? -angle : angle;

        let finalRotation = currentRotation.current + angle;

        const rotateAnimations = gsap.timeline
        (
            {
                onStart : () => setIsAnimated(true),
                onComplete : () => setIsAnimated(false)
            }
        );

        rotateAnimations.add([
            gsap.to('.history__control-name', {opacity: 0, duration: 0}),
            gsap.to('.swiper', {opacity: 0, duration: 0.2}),
            gsap.to('.history__control', {rotation: finalRotation, duration: 1, ease: "power1.out",}),
            gsap.to('.history__controls', {rotation: -finalRotation, duration: 1, ease: "power1.out",}),
            gsap.to(yearStartRef.current, {
                duration: 1,
                snap: { textContent: 1 },
                ease: "power1.out",
                textContent: info.intervals[activeInterval - 1].yearStart,
            }),
            gsap.to(yearEndRef.current, {
                duration: 1,
                snap: { textContent: 1 },
                ease: "power1.out",
                textContent: info.intervals[activeInterval - 1].yearEnd,
            })
        ], 0)
        .add([
            gsap.to('.swiper', {opacity: 1, duration: 0.2}),
            gsap.to('.history__control-active .history__control-name', {opacity: 1, duration: 0.1}),
        ]);

        prevInterval.current = activeInterval;

        currentRotation.current = Math.ceil(finalRotation);

    }, [activeInterval]);

    return (
        <div className={'history'}>
            <div className={'history__delimiters'}>
                <div className={'history__vertical'}></div>
                <div className={'history__horizontal'}></div>
            </div>
            <HistoryTitle title={info.header}/>
            <HistoryDates
                interval={info.intervals[0]}
                yearStartRef={yearStartRef}
                yearEndRef={yearEndRef}
            />
            <HistoryControls
                activeInterval={activeInterval}
                countIntervals={countIntervals}
                handlePrev={handlePrev}
                handleNext={handleNext}
                isAnimated={isAnimated}
            />
            <HistorySlider events={info.intervals[activeInterval - 1].events}/>
            <HistoryCircle
                intervals={info.intervals}
                activeInterval={activeInterval}
                discRef={discRef}
                controlsRef={controlsRef}
                setActiveByIndex={setActiveByIndex}
                pointsStyles={pointsStyles}
                isAnimated={isAnimated}
            ></HistoryCircle>
        </div>
    );
}