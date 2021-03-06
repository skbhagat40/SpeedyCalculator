import React from "react";
import {Button} from "antd";

export class QuestionBox extends React.Component {
    constructor(props) {
        super(props);
        this.handleUserResponse = this.handleUserResponse.bind(this);
        this.OPERATORS = {
            '+': (a, b) => (a + b),
            '-': (a, b) => (a - b),
            '*': (a, b) => (a * b),
            '/': (a, b) => (a / b)
        };
    }

    generateQuestion() {
        this.operator = Object.keys(this.OPERATORS)[Math.floor(Math.random() * 4)];
        this.operand1 = Math.floor(Math.random() * 10);
        this.operand2 = Math.floor(Math.random() * 10);
        this.correctAnswer = this.OPERATORS[this.operator].call(null, this.operand1, this.operand2);
        this.getOptions();
    }

    getOptions() {
        let options = Array.from({length: 4}, () => Math.floor(Math.random() * 40));
        options[Math.floor(Math.random() * 4)] = this.correctAnswer;
        this.options = options;
    }

    handleUserResponse(selectedOption) {
        // console.log(this.props);
        this.props.handleOptionSelect(selectedOption === this.correctAnswer);
    }

    render() {
        this.generateQuestion();
        return !this.props.isGameOver && (<div>
            <h4>{this.operand1} {this.operator} {this.operand2}</h4>
            <ul>
                {this.options.map((el, idx) => <li key={idx}>
                    <Button onClick={this.handleUserResponse.bind(this, el)}>{el}</Button>
                </li>)}
            </ul>
        </div>)
    }
}