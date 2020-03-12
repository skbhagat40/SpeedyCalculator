import React from "react";
import {SpeedyCalcHeader} from "./containers/SpeedyCalcHeader";
import {TIME_PER_QUESTION} from "./constants";

export class TimerHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {totalTime: 0, timer: TIME_PER_QUESTION};
        this.handleCorrectOption = this.handleCorrectOption.bind(this);
        this.resetState = this.resetState.bind(this);
        this.initializeTimer();
    }

    initializeTimer() {
        this.timer = setInterval(() => {
            this.setState((state) => ({timer: state.timer - 1}));
            if (this.state.timer === 0) {
                this.props.handleGameOver(true);
                clearInterval(this.timer);
            }
        }, 1000);
    }

    handleCorrectOption() {
        this.setState((state) => ({
            timer: TIME_PER_QUESTION,
            totalTime: state.totalTime + TIME_PER_QUESTION - this.state.timer
        }));
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    resetState() {
        this.setState({
            totalTime: 0,
            timer: TIME_PER_QUESTION,
        });
        this.initializeTimer();
    }

    render() {
        return !this.props.isGameOver && (<div>
            <SpeedyCalcHeader {...this.props} {...this.state} />
        </div>)
    }

}