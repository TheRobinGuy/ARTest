import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ReactCursorPosition from 'react-cursor-position';


ReactDOM.render(
    <ReactCursorPosition
    mapChildProps={({ elementDimensions, isActive, isPositionOutside, position }) => {
        return {
            elementDimensions,
            isActive,
            isOutside: isPositionOutside,
            point: position
        };
    }}>
        <App />
    </ReactCursorPosition>

    , document.getElementById('root'));
registerServiceWorker();
