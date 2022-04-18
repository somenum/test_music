import React from 'react';
import './ElementItem.css';

const ElementItem = ({text}) => {
    return (
        <div
            className="item__container"
        >
            {text}
        </div>
    )
}

export default ElementItem;