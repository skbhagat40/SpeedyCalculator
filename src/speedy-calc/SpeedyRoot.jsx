import React from "react";
import {TimerHeader} from "./TimerHeader";
import {QuestionBox} from "./QuestionBox";
import {TIME_PER_QUESTION} from "./constants";
import {GameOver} from "./containers/GameOver";

export class SpeedyRoot extends React.Component {
    constructor(props) {
        super(props);
        this.timerElement = React.createRef();
        this.state = {isGameOver: false, currentScore: 0};

        this.updateGameOver = this.updateGameOver.bind(this);
        this.handleOptionSelect = this.handleOptionSelect.bind(this);
    }

    handleOptionSelect(isAnswerCorrect) {
        // Communicate timer to update it's state.
        if (isAnswerCorrect) {
            this.setState((state) => ({
                currentScore: state.currentScore + 1,
                totalTime: state.totalTime + (TIME_PER_QUESTION - state.timer)
            }), this.timerElement.handleCorrectOption()); // pass as a callback as state updates are async.
        }
        else {
            this.setState((state) => ({isGameOver: true}));
            clearInterval(this.timer);
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.totalTime = this.timerElement.state.totalTime || 0;
    }

    updateGameOver(gameStatus) {
        this.setState((state) => ({isGameOver: gameStatus}));
    }

    restartGame = () => {
        this.setState({
            isGameOver: false,
            currentScore: 0,
        });
        this.timerElement.resetState();
        // this.forceUpdate();
    };

    render() {
        return (<div>
            <TimerHeader isGameOver={this.state.isGameOver} {...this.state} ref={(el) => this.timerElement = el} handleGameOver={this.updateGameOver}/>
            { this.state.isGameOver && <GameOver {...this.state}  isGameOver={this.state.isGameOver} restartGame={this.restartGame} timeCounsumed={this.totalTime}/>
            }
            <QuestionBox isGameOver={this.state.isGameOver} handleOptionSelect={this.handleOptionSelect}/>
              </div>)
    }
}