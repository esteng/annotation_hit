import './App.css';
import React, { Component } from 'react';
import mock from './mock.json';
import Header from './Header'
import TextSliderPanel from './TextSliderPanel'
import {Alert, FormControlLabel, Checkbox, Button, TextField } from '@mui/material';
import { Typography } from '@material-ui/core';


// import QuestionPanel from './QuestionPanel'
// import ButtonPanel from './ButtonPanel'

// import Button from "@material-ui/core/Button/Button";
// Main class that serves the app  


class App extends Component {
  // needs to
  // 1. display image and question
  // 2. display answer groups (pre-initialized)
  // 3. allow drag and drop groups 
  // 4. display text box per group 
  // 5. have a submit button
  // 6. have a skip button with a required text box  
  constructor(props){
    super(props);
    // initalize
    var el = document.querySelector("#hiddenSubmit");
    if (el) {
      // if el is not null, than this code is loaded by Turkle.
      el.style.display = 'none';
      // hide the other inputs as well 
      var answerQuestionsInput = document.querySelector("#paraphraseStmtInput")
      answerQuestionsInput.style.display = "none"
      var answerQuestionsInput = document.querySelector("#paraphraseStmtHistoryInput")
      answerQuestionsInput.style.display = "none"
      var isSkipInput = document.querySelector("#sliderValueInput")
      isSkipInput.style.display = "none"
      var skipReasonInput = document.querySelector("#commentInputInput")
      skipReasonInput.style.display = "none"
      


      const inputStmt = window.inputStmt;
      console.log("input: ");
      console.log(inputStmt);

      this.state = {
        inputStmt: inputStmt,
        paraphraseStmt: "",
        paraphraseStmtHistory: [],
        sliderValue: 50,
        commentInput: "",
        errorMessage: "",
      };

    } 
    else {
      // this code is executed independently, not inside Turkle.
      const {inputStmt, sliderValue, commentInput} = mock;

      this.state = {
        inputStmt: inputStmt,
        paraphraseStmt: "",
        paraphraseStmtHistory: [],
        sliderValue: sliderValue,
        commentInput: commentInput,
        errorMessage: null,
      };
    }
    this.originalState = JSON.parse(JSON.stringify(this.state))

  }


  handleSubmit = event => {
    if (this.state.paraphraseStmtHistory.length < 1) {
      this.setState({"errorMessage": "Please enter a non-empty paraphrase"});
      event.preventDefault();
    }
    if (this.state.paraphraseStmtHistory.length < 3 & this.state.paraphraseStmtHistory.length > 0) {
      this.setState({"errorMessage": "No pasting please!"});
      event.preventDefault();
    }
    console.log("state")
    console.log(this.state);
    // stringify state 
    var paraphraseStmt = document.querySelector("#paraphraseStmtInput")
    if (paraphraseStmt) {
      paraphraseStmt.value = JSON.stringify(this.state.paraphraseStmt);
    }

    var paraphraseStmtHistory = document.querySelector("#paraphraseStmtHistoryInput")
    if (paraphraseStmtHistory) {
      paraphraseStmtHistory.value = JSON.stringify(this.state.paraphraseStmtHistory);
    }

    var sliderValue = document.querySelector("#sliderValueInput")
    if (sliderValue) {
      sliderValue.value = JSON.stringify(this.state.sliderValue);
    }

    var commentInput = document.querySelector("#commentInputInput")
    if (commentInput) {
      commentInput.value = JSON.stringify(this.state.commentInput)
    }
  }

  handleReset = () => {
    // this.setState({...this.originalState}) 
    // this.setState({isSkipped: false})
    window.location.reload(false)
  }

  handleCommentUpdate = (event) => {
    this.setState({"commentInput": event.target.value })
  }

  handleAnswerStatementUpdate = (event) => {
    var newValue = event.target.value;
    var history = this.state.paraphraseStmtHistory
    history.push(newValue)
    this.setState({"paraphraseStmt": newValue,
                  "paraphraseStmtHistory": history});
    if (this.state.paraphraseStmtHistory.length > 2) {
      this.setState({"errorMessage": null});
    }
  }

  render() {
    return (
    <div>
      <Header trainingBtn={null} handleFontSizeChange={false}/>
      <div style={{width: "100%",  float: "left", marginLeft: "30px", textAlign: "left", marginBottom:"50px"}}>
        <TextSliderPanel 
          inputId={this.state.inputId} 
          inputStmt={this.state.inputStmt} 
          paraphraseStmt={this.state.paraphraseStmt} 
          sliderValue={this.state.sliderValue} 
          questionHandler={this.handleAnswerStatementUpdate}
          sliderHandler={this.handleSliderUpdate}
          errorMessage={this.state.errorMessage}
        />
      </div>
      <div style={{width: "100%", marginLeft: "30px", marginBottom: "60px"}}>
        <input  onClick={this.handleSubmit} className="button1"
          type="submit" value="Submit" />
      </div>
      <div></div>
      <div style={{width: "50%", marginLeft: "30px"}}>
        <TextField 
          id="comment" 
          helperText="Comments (if any)"  
          fullWidth 
          onChange={(event) => this.handleCommentUpdate(event)}></TextField>
      </div>
    </div>
    );
  }
}

export default App;
