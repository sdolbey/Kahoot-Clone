import React from 'react';
import './App.css';
import QuizQuestion from './QuizQuestion'
import questions from './questions.json'

const TIME_LIMIT = 5
const TITLE_STATE = 0
const QUESTION_STATE = 1
const FINAL_STATE = 2


class QuizQuestion extends React.Component {
  render() {
    return <>
    <h1>{this.props.question}</h1>
    {this.props.answers.map((v, i) =>
    <input onClick={() => this.props.nextQuestion()} type="button" key={i} value={v.text}/>)}
    </>
    }
  }

// Use parenthesis around return elements in order to include more than
class TitlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: 'Welcome to our quiz!',
      counter: 0,
      currentState: TITLE_STATE,
    }
  this.timeLimit = TIME_LIMIT;
  }
  nextQuestion() {
    clearInterval(this.timer);
    this.setState({
      titleText: "You answered X",
      currentState: FINAL_STATE
    })
  }
  countdown() {
    console.log("Handling interval")
    console.log(this.state.counter)
    if(this.state.counter < this.timeLimit) {
      this.setState({
        titleText: 'Starting the Quiz',
        counter: this.state.counter + 1
      })
    } else {
      this.setState({
        titleText: "Beginning Quiz!",
        currentState: QUESION_STATE,
        counter: 0
      })
      this.timer = setInterval(() => this.countdown(), 1000
      )
      clearInterval(this.timer)
    }
  }

  start() {
    console.log("Starting!")
    this.setState({titleText: "Starting the Quiz!", counter: 0})
    this.timer = setInterval(() => this.countdown(), 1000)
}

  render() {
    return (
      <>
      <p>{this.timeLimit - this.state.counter}</p>
      {((this.state.currentState === TITLE_STATE) ?
      <>
      <h2>{this.state.titleText}</h2>
      <input className="start" type="button" value="start" onClick={()=>this.start()} />
      </>
      :
      <QuizQuestion answers={questions[0].possibleAnswers} question={questions[0].question} nextQuestion={() => this.nextQuestion()}></QuizQuestion>)}
      </>)
  }
}

function App() {
  return(
    <div className="App">
      <TitlePage></TitlePage>
    </div>
  );
}

export default App;
