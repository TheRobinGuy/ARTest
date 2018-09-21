import React from "react";
require('tracking')
require('tracking/build/data/face')

export default class Camera extends React.Component {
    state = {
        tracker: null
    }


    componentDidMount() {
        this.state.tracker = new window.tracking.ColorTracker(['magenta']);
        this.state.tracker.on('track', (e) => {
            if (e.data.lentgh === 0) {
                // No colours to track!
            }
            else {
                e.data.forEach((color) => {
                    console.log(color.x, color.y, color.height, color.width, color.color);
                })
            }
        });
        window.tracking.track(this.refs.cameraOutput, this.state.tracker, { camera: true });
    }

}