import "./Power.css";
import React from "react";

class Power extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xPos: 20 + Math.random() * 1000,
      yPos: 20 + Math.random() * 600,
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      if (
        !this.props.gameEnded &&
        this.props.powerTouched(this.state.xPos, this.state.yPos)
      ) {
        this.setState({
          xPos: 20 + Math.random() * 1000,
          yPos: 20 + Math.random() * 600,
        });
      }
    });
  }

  render() {
    if (!this.props.gameEnded) {
      return (
        <div
          className="power"
          style={{ top: this.state.yPos, left: this.state.xPos }}
        ></div>
      );
    } else {
      return null;
    }
  }
}

export default Power;
