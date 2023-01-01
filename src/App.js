import "./App.css";
import React from "react";
import Enemy from "./components/Enemy";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xPos: 900,
      yPos: 600,
      gameEnded: false,
    };
    this.interval = null;
    this.moveBall = this.moveBall.bind(this);
    this.checkPos = this.checkPos.bind(this);
    this.replay = this.replay.bind(this);
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
    if (
      ((this.state.xPos - enemyxPos) ** 2 +
        (this.state.yPos - enemyyPos) ** 2) **
        0.5 <
        15 &&
      !this.state.gameEnded
    ) {
      console.log("    Plr enmy");
      console.log("XPOS", this.state.xPos, enemyxPos);
      console.log("YPOS", this.state.yPos, enemyyPos);
      console.log("________________________");
      this.setState({
        gameEnded: true,
      });
    } //Make modal and if the button is pressed switch gameEnded to false
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
    });
    window.addEventListener("keydown", this.moveBall);
  }

  render() {
    if (this.state.gameEnded) {
      return (
        <div className="gameOver">
          Play Again!!!
          <Enemy gameEnded={this.state.gameEnded}></Enemy>
          <button onClick={this.replay}>Click me</button>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <div
              className="ball"
              style={{ top: this.state.yPos, left: this.state.xPos }}
            ></div>
            <Enemy
              checkPos={this.checkPos}
              xPos={this.state.xPos}
              yPos={this.state.yPos}
              gameEnded={this.state.gameEnded}
            ></Enemy>
            {/* <powerUp gameEnded={this.state.gameEnded}></powerUp> */}
          </header>
        </div>
      );
    }
  }
}

export default App;
