import React from 'react';

interface HistoryTitleProps {
    title: string
}

const HistoryTitle = ({ title } : HistoryTitleProps) => {
    return <div className='history__title'>{title}</div>;
};

export default HistoryTitle;