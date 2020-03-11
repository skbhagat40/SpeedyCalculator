import React from "react";

export class GameOver extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.isGameOver && (<div>
            <h4>Game Over</h4>
            <p>
                Score: {this.props.currentScore}
                Time Consumed: {this.props.timeCounsumed}
            </p>
            <button onClick={this.props.restartGame}>Ok</button>
        </div>)
    }
}