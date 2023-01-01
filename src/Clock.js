import React from "react";

class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            seconds: 0,
        }
        this.timer = null
    }

    componentDidMount() {
        this.timer = setInterval( () => {
            this.setState({
                seconds: this.state.seconds + this.props.increment
            }) 
        }, 1000) 
    }

    componentWillUnmount() {
        clearInterval(this.timer) 
    }
    render() {
        return(
            <div>
                {this.state.seconds}
            </div>
        )

    }
}

export default Clock