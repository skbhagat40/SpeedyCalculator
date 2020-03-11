import React from "react";

export class SpeedyCalcHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul>
                <li key="0">
                    Score: {this.props.currentScore}
                </li>
                <li key="1">
                    Total Time: {this.props.totalTime}
                </li>
                <li key="2">
                    Timer: {this.props.timer}
                </li>
            </ul>
        )
    }
}