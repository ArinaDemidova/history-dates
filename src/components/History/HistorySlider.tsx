import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import ArrowIcon from '../../../src/assets/images/arrow-left.svg';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import {NavigationOptions} from "swiper/types";
import {HistoryEvent} from "../../types/History/HistoryEvent";

interface HistorySliderProps {
    events: HistoryEvent[]
}

const HistorySlider = ({ events } : HistorySliderProps) => {
    return (
        <Swiper
            slidesPerView={3}
            spaceBetween={80}
            modules={[Navigation]}
            navigation={{nextEl: '.swiper__button-next', prevEl: '.swiper__button-prev'} as NavigationOptions}
            className='swiper'
        >
            {events.map(({ text, title }, index) => (
                <SwiperSlide key={index}>
                    <div className='swiper__slide-title'>{title}</div>
                    <div className='swiper__slide-text'>{text}</div>
                </SwiperSlide>
            ))}
            <div className='swiper__button-prev'>
                <div className='swiper__button-circle'><ArrowIcon /></div>
            </div>
            <div className='swiper__button-next'>
                <div className='swiper__button-circle'><ArrowIcon /></div>
            </div>
        </Swiper>
    );
};

export default HistorySlider;