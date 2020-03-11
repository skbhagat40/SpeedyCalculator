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
        this.restartGame = this.restartGame.bind(this);
        this.updateGameOver = this.updateGameOver.bind(this);
        this.handleOptionSelect = this.handleOptionSelect.bind(this);
        this.prevState = {};
    }

    handleOptionSelect(isAnswerCorrect) {
        // Communicate timer to update it's state.
        if (isAnswerCorrect) {
            this.setState((state) => ({
                currentScore: state.currentScore + 1,
                totalTime: state.totalTime + (TIME_PER_QUESTION - state.timer)
            }));
            this.timerElement.handleCorrectOption();
        }
        else {
            this.setState((state) => ({isGameOver: true}));
            clearInterval(this.timer);
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.prevState = prevState;
        console.log(this.timerElement);
        this.totalTime = this.timerElement.state.totalTime || 0;
        console.log('component did update in speedy root', this.prevState, this.state);
    }

    updateGameOver(gameStatus) {
        console.log('update game over called', gameStatus);
        this.setState((state) => ({isGameOver: gameStatus}));
    }

    restartGame() {
        this.setState({
            isGameOver: false,
            currentScore: 0,
        });
        this.timerElement.resetState();
        // this.forceUpdate();
    }

    render() {
        return (<div>
            <TimerHeader isGameOver={this.state.isGameOver} {...this.state} ref={(el) => this.timerElement = el} handleGameOver={this.updateGameOver}/>
            <QuestionBox isGameOver={this.state.isGameOver} handleOptionSelect={this.handleOptionSelect}/>
            <GameOver {...this.state}  isGameOver={this.state.isGameOver} restartGame={this.restartGame} timeCounsumed={this.totalTime}/>
        </div>)
    }
}