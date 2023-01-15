import "./Enemy.css";
import React from "react";

class Enemy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xPos: 900,
      yPos: 100,
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
    console.log(this.props.gameEnded);
    this.timer = setInterval(() => {
      //console.log(this.props.gameEnded);
      if (!this.props.gameEnded) {
        this.setState({
          xPos: this.state.xPos + this.moveX(),
          yPos: this.state.yPos + this.moveY(),
        });
      } else {
        console.log(this.props.gameEnded);
        this.setState({
          xPos: 900,
          yPos: 100,
        });
      }
    }, 40);
  }

  componentWillUnmount() {
    console.log("Componentwillunmount");
  }

  componentDidUpdate() {
    if (this.state.gameEnded) {
      clearInterval(this.timer);
    } else {
      this.props.checkPos(this.state.xPos, this.state.yPos);
    }
  }

  moveX() {
    // console.log("movex");
    if (this.props.xPos - this.state.xPos > 0) {
      return 3;
    } else if (this.props.xPos - this.state.xPos < 0) {
      return -3;
    }
    return 0;
  }

  moveY() {
    // console.log("movey");
    if (this.props.yPos - this.state.yPos > 0) {
      return 3;
    } else if (this.props.yPos - this.state.yPos < 0) {
      return -3;
    }
    return 0;
  }

  render() {
    return (
      <div
        className="enemy"
        style={{ top: this.state.yPos, left: this.state.xPos }}
      ></div>
    );
  }
}

export default Enemy;
