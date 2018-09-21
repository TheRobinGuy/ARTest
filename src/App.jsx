import React, { Component } from 'react';
import './App.css';
require('tracking')
require('tracking/build/data/eye')

class App extends Component {

  state = {
    mainCanvas: Object,
    mainContext: Object,
    canvasWidth: Object,
    canvasHeight: Object,
    mouseX: this.props.point.x,
    mouseY: this.props.point.y,
    targetStartAngle: 0,
    targetEndAngle: 360,
    targetInnerStartAngle: 260,
    targetInnerEndAngle: 20,
    tracker: null,
  }

  getMousePosition = (e, xIn, yIn) => {
    setInterval(() => {
      this.setState({ mouseX: xIn, mouseY: yIn });
      this.state.mainContext.clearRect(0, 0, this.state.mainCanvas.width, this.state.mainCanvas.height);
      if (!this.props.isOutside) {
        this.drawCircle();
        this.rotateTarget();
      }
    }, 20);

  }

  drawCircle = () => {
    //Outer circle
    // draw the colored region
    this.state.mainContext.beginPath();
    this.state.mainContext.arc(this.state.mouseX, this.state.mouseY, 20, this.state.targetStartAngle, this.state.targetEndAngle, true);
    this.state.mainContext.fillStyle = 'transparent';
    this.state.mainContext.fill();

    // draw the stroke
    this.state.mainContext.lineWidth = 3;
    this.state.mainContext.strokeStyle = '#66CC01';
    this.state.mainContext.stroke();

    //Inner circle
    this.state.mainContext.beginPath();
    this.state.mainContext.arc(this.state.mouseX, this.state.mouseY, 15, this.state.targetInnerStartAngle, this.state.targetInnerEndAngle, false);
    this.state.mainContext.fillStyle = 'transparent';
    this.state.mainContext.fill();

    this.state.mainContext.lineWidth = 3;
    this.state.mainContext.strokeStyle = '#66CC01';
    this.state.mainContext.stroke();
  }

  rotateTarget = () => {
    this.state.targetStartAngle += .1;
    this.state.targetEndAngle += .1;

    this.state.targetInnerStartAngle -= .1;
    this.state.targetInnerEndAngle -= .1;
  }

  useCamera = () => {
    var video = document.getElementById('video');

    // Get access to the camera!
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
      });
    }
  }

  trackColors = (e) => {
    this.state.tracker = new window.tracking.ObjectTracker('eye');
    this.state.tracker.setInitialScale(4);
    this.state.tracker.setStepSize(2);
    this.state.tracker.setEdgesDensity(0.1);
    this.state.tracker.on('track', (e) => {
      if (e.data.lentgh === 0) {
        // No colours to track!
      }
      else {
        e.data.forEach((color) => {
          console.log(color.x, color.y, color.height, color.width, color.color);
          this.getMousePosition(e, color.x, color.y);
        })
      }
    });
    window.tracking.track(this.refs.cameraOutput, this.state.tracker, { camera: true });
  }

  componentDidMount = () => {
    this.state.mainCanvas = document.getElementById("canvas");
    this.state.mainCanvas.width = window.innerWidth;
    this.state.mainCanvas.height = window.innerHeight;
    this.state.mainContext = this.state.mainCanvas.getContext("2d");
    this.state.canvasWidth = this.state.mainCanvas.width;
    this.state.canvasHeight = this.state.mainCanvas.height;
    this.useCamera();
    this.trackColors();
  }

  render() {
    return (
        <div onMouseOver={this.trackColors} className="App">
          <p>Mouse : {this.state.mouseX}, {this.state.mouseY}</p>
          <video style={{ position: "absolute", zIndex: -999 }} ref="cameraOutput" id="video" width="640" height="480" autoPlay loop muted></video>
          <canvas id="canvas"></canvas>
        </div>
    );
  }
}

export default App;
