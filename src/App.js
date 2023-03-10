import "./App.css";
import React, { Fragment } from "react";
import Enemy from "./components/Enemy";
import Power from "./components/Power";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xPos: 900,
      yPos: 600,
      gameEnded: false,
      score: 0,
    };
    this.interval = null;
    this.moveBall = this.moveBall.bind(this);
    this.checkPos = this.checkPos.bind(this);
    this.replay = this.replay.bind(this);
    this.powerTouched = this.powerTouched.bind(this);
  }

  moveBall(event) {
    //"this" changes because we are calling this.moveBall in addEventListener
    var key = event.key.toLowerCase();
    if (key === "w") {
      this.setState({
        yPos: this.state.yPos - 10,
      });
    }
    if (key === "s") {
      this.setState({
        yPos: this.state.yPos + 10,
      });
    }
    if (key === "a") {
      this.setState({
        xPos: this.state.xPos - 10,
      });
    }
    if (key === "d") {
      this.setState({
        xPos: this.state.xPos + 10,
      });
    }
    this.ballBoundary();
  }

  ballBoundary() {
    //Boundaries for the ball so it doesnt get off screen
    if (this.state.xPos > window.innerWidth) {
      this.setState({
        xPos: window.innerWidth,
      });
    }
    if (this.state.xPos < 0) {
      this.setState({
        xPos: 0,
      });
    }
    if (this.state.yPos > window.innerHeight) {
      this.setState({
        yPos: window.innerHeight,
      });
    }
    if (this.state.yPos < 0) {
      this.setState({
        yPos: 0,
      });
    }
  }

  checkPos(enemyxPos, enemyyPos) {
    // console.log("XPOS", this.state.xPos, enemyxPos);
    // console.log("YPOS", this.state.yPos, enemyyPos);
    if (
      ((this.state.xPos - enemyxPos) ** 2 +
        (this.state.yPos - enemyyPos) ** 2) **
        0.5 <
        15 &&
      !this.state.gameEnded
    ) {
      // console.log("    Plr enmy");
      // console.log("XPOS", this.state.xPos, enemyxPos);
      // console.log("YPOS", this.state.yPos, enemyyPos);
      // console.log("________________________");
      this.setState({
        gameEnded: true,
      });
      console.log("checkPos");
    } //Make modal and if the button is pressed switch gameEnded to false
  }

  powerTouched(powerxPos, poweryPos) {
    if (
      ((this.state.xPos - powerxPos) ** 2 +
        (this.state.yPos - poweryPos) ** 2) **
        0.5 <
      15
    ) {
      this.setState({
        score: this.state.score + 1,
      });
      return true;
    }
    return false;
  }

  componentDidMount() {
    window.addEventListener("keydown", this.moveBall);
  }

  componentDidUpdate() {
    if (this.state.gameEnded) {
      window.removeEventListener("keydown", this.moveBall);
    }
    // console.log(this.state.gameEnded);
  }

  replay() {
    this.setState({
      gameEnded: false,
      xPos: 900,
      yPos: 600,
      score: 0,
    });
    console.log("s");
    window.addEventListener("keydown", this.moveBall);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {!this.state.gameEnded ? (
            <div className="newScore" key={this.state.score}>
              {/* I want to make transition for everytiwme this gets updated */}
              <p>{this.state.score}</p>
            </div>
          ) : (
            <div onClick={this.replay} className="gameOver">
              Click anywhere to play again!!!
            </div>
          )}
          <div
            className="ball"
            style={{ top: this.state.yPos, left: this.state.xPos }}
          ></div>
          <Power
            powerTouched={this.powerTouched}
            xPos={this.state.xPos}
            yPos={this.state.yPos}
            gameEnded={this.state.gameEnded}
          ></Power>
          <Enemy
            checkPos={this.checkPos}
            xPos={this.state.xPos}
            yPos={this.state.yPos}
            gameEnded={this.state.gameEnded}
          ></Enemy>
        </header>
      </div>
    );
  }
}

export default App;
