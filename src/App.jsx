import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    mainCanvas: Object,
    mainContext: Object,
    canvasWidth: Object,
    canvasHeight: Object,
    mouseX: this.props.point.x,
    mouseY: this.props.point.y
  }

  getMousePosition = (e) => {
    this.setState({ mouseX: this.props.point.x, mouseY: this.props.point.y});
    this.state.mainContext.clearRect(0, 0, this.state.mainCanvas.width, this.state.mainCanvas.height);
    if(!this.props.isOutside){
    this.drawCircle();
    }

  }

  drawCircle = () => {
    // draw the colored region
    this.state.mainContext.beginPath();
    this.state.mainContext.arc(this.state.mouseX, this.state.mouseY, 10, 0, 360, true);
    this.state.mainContext.fillStyle = 'transparent';
    this.state.mainContext.fill();

    // draw the stroke
    this.state.mainContext.lineWidth = 3;
    this.state.mainContext.strokeStyle = '#66CC01';
    this.state.mainContext.stroke();
  }

  componentDidMount = () => {
    this.state.mainCanvas = document.getElementById("canvas");
    this.state.mainCanvas.width = window.innerWidth;
    this.state.mainCanvas.height = window.innerHeight;
    this.state.mainContext = this.state.mainCanvas.getContext("2d");
    this.state.canvasWidth = this.state.mainCanvas.width;
    this.state.canvasHeight = this.state.mainCanvas.height;
  }

  render() {
    return (
        <div onMouseMove={this.getMousePosition} className="App">
          <p>Mouse : {this.state.mouseX}, {this.state.mouseY}</p>
          <canvas id="canvas">

          </canvas>
        </div>
    );
  }
}

export default App;
