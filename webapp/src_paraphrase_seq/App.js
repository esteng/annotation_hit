import './App.css';
import React, { Component } from 'react';
import mock from './mock.json';
import Header from './Header'
import TextSliderPanel from './TextSliderPanel'
import { TextField } from '@mui/material';


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
      var answerQuestionsInputList = document.querySelector("#paraphraseStmtInputList")
      answerQuestionsInputList.style.display = "none"
      var paraphraseHistoryList = document.querySelector("#paraphraseStmtHistoryInputList")
      paraphraseHistoryList.style.display = "none"
      var skipReasonInputList = document.querySelector("#commentInputInputList")
      skipReasonInputList.style.display = "none"
      var exampleIndexInput = document.querySelector("#exampleIndex");
      // initialize with 0 at the start of the HIT
      exampleIndexInput.value = 0;   
      var exampleIndexInputNow = document.querySelector("#exampleIndex");

      exampleIndex = exampleIndexInput.value
      exampleIndexInput.style.display = "none"
      


      const inputStmtList = window.inputStmtList;

      var empty_str_list = []
      var empty_list_list = []
      var value_list = []
      var inputIdList = []
      for (var i = 0; i < inputStmtList.length; i++) {
        empty_str_list.push("")
        empty_list_list.push([])
        value_list.push(50)
        inputIdList.push(i)
      }
      
      var maxLength = inputStmtList.length - 1;

      this.state = {
        maxLength: maxLength,
        inputStmtList: inputStmtList,
        inputIdList: inputIdList,
        paraphraseStmtList: JSON.parse(JSON.stringify(empty_str_list)),
        paraphraseStmtHistoryList: JSON.parse(JSON.stringify(empty_list_list)),
        sliderValueList: JSON.parse(JSON.stringify(value_list)),
        sliderValueHistoryList: JSON.parse(JSON.stringify(empty_list_list)),
        commentInputList: JSON.parse(JSON.stringify(empty_str_list)),
        errorMessageList: JSON.parse(JSON.stringify(empty_str_list)),
        exampleIndex: 0,
      };

    } 
    else {
      // this code is executed independently, not inside Turkle.
      const {inputStmtList, sliderValueList, commentInputList} = mock;
     
      var exampleIndex;  
      var n = document.querySelector("#exampleIndex")
      if (n) {
        exampleIndex = n.value
      }
      else {
        exampleIndex = 0;
      }

      var empty_str_list = []
      var empty_list_list = []
      var inputIdList = []
      for (var i = 0; i < inputStmtList.length; i++) {
        empty_str_list.push("")
        empty_list_list.push([])
        inputIdList.push(i)
      }
      var maxLength = inputStmtList.length - 1

      this.state = {
        maxLength: maxLength,
        inputIdList: inputIdList,
        inputStmtList: inputStmtList,
        paraphraseStmtList: JSON.parse(JSON.stringify(empty_str_list)),
        paraphraseStmtHistoryList: JSON.parse(JSON.stringify(empty_list_list)),
        sliderValueList: JSON.parse(JSON.stringify(sliderValueList)),
        sliderValueHistoryList: JSON.parse(JSON.stringify(empty_list_list)),
        commentInputList: JSON.parse(JSON.stringify(empty_str_list)),
        errorMessageList: JSON.parse(JSON.stringify(empty_str_list)),
        exampleIndex: exampleIndex,
      };
    }
    this.originalState = JSON.parse(JSON.stringify(this.state))

  }
 
  checkButton = event => {
    var errorMessageList = this.state.errorMessageList;
    if (this.state.paraphraseStmtHistoryList[this.state.exampleIndex].length < 1) {
      errorMessageList[this.state.exampleIndex] = "Please enter a non-empty paraphrase";
      this.setState({"errorMessageList": errorMessageList});
      event.preventDefault();
      return [event, false];
    }
    var historyShorterThanText = this.state.paraphraseStmtHistoryList[this.state.exampleIndex].length < this.state.paraphraseStmtList[this.state.exampleIndex].length;
    if (historyShorterThanText  & this.state.paraphraseStmtHistoryList[this.state.exampleIndex].length > 0) {
      errorMessageList[this.state.exampleIndex] = "No pasting please";
      this.setState({"errorMessageList": errorMessageList});
      event.preventDefault();
      return [event, false];
    }
    console.log(this.state.sliderValueHistoryList[this.state.exampleIndex])
    if (this.state.sliderValueHistoryList[this.state.exampleIndex].length < 1) {
      errorMessageList[this.state.exampleIndex] = "Please adjust the confidence";
      this.setState({"errorMessageList": errorMessageList});
      event.preventDefault();
      return [event, false];
    }
    return [event, true];
  }

  handleSubmit = event => {
    console.log(this.state.paraphraseStmtList);
    console.log(this.state.sliderValueList);
    var event_and_allow_next = this.checkButton(event);
    event = event_and_allow_next[0];

    // stringify state 
    var paraphraseStmtList = document.querySelector("#paraphraseStmtInputList")
    if (paraphraseStmtList) {
      paraphraseStmtList.value = JSON.stringify(this.state.paraphraseStmtList);
    }

    var paraphraseStmtHistoryList = document.querySelector("#paraphraseStmtHistoryInputList")
    if (paraphraseStmtHistoryList) {
      paraphraseStmtHistoryList.value = JSON.stringify(this.state.paraphraseStmtHistoryList);
    }

    var sliderValueList = document.querySelector("#sliderValueInputList")
    if (sliderValueList) {
      sliderValueList.value = JSON.stringify(this.state.sliderValueList);
    }

    var commentInputList = document.querySelector("#commentInputInputList")
    if (commentInputList) {
      commentInputList.value = JSON.stringify(this.state.commentInputList);
    }
  }

  handleNext = event => {
    // increment exampleIndex to get the next example 
    var event_and_allow_next = this.checkButton(event);
    event = event_and_allow_next[0];
    var allow_next = event_and_allow_next[1];
    if (allow_next) {
      var n = document.querySelector("#exampleIndex")
      if (n) {
        var fromDoc = parseInt(n.value);
        this.setState({exampleIndex: fromDoc + 1})
        n.value = fromDoc + 1;
      }
      else {
        this.setState({exampleIndex: this.state.exampleIndex + 1});
        // this.setState({paraphraseStmtList: this.state.paraphraseStmtList})
      }

    }
  }


  handleReset = () => {
    window.location.reload(false)
  }

  handleCommentUpdate = (event) => {
    var commentInputList = this.state.commentInputList
    commentInputList[this.state.exampleIndex] = event.target.value
    this.setState({"commentInputList": commentInputList})
  }

  handleAnswerStatementUpdate = (event) => {
    var newValue = event.target.value;
    var paraphraseStmtList = this.state.paraphraseStmtList;
    paraphraseStmtList[this.state.exampleIndex] = newValue;

    var historyList = this.state.paraphraseStmtHistoryList;
    historyList[this.state.exampleIndex].push(newValue)

    this.setState({"paraphraseStmtList": paraphraseStmtList,
                  "paraphraseStmtHistoryList": historyList});

    if (this.state.paraphraseStmtHistoryList[this.state.exampleIndex].length > 2) {
      var errorMessageList = this.state.errorMessageList;
      errorMessageList[this.state.exampleIndex] = null;
      this.setState({"errorMessageList": errorMessageList});
    }
  }

  handleSliderUpdate = (event, newValue) => {
      var sliderValueList = this.state.sliderValueList;
      sliderValueList[this.state.exampleIndex] = newValue;
      var sliderValueHistoryList = this.state.sliderValueHistoryList;
      sliderValueHistoryList[this.state.exampleIndex].push(newValue);
      this.setState({"sliderValueList": sliderValueList,
                    "sliderValueHistoryList": sliderValueHistoryList});
  };

  render() {
    var submitButton;
    if (this.state.exampleIndex === this.state.maxLength) {
      if (this.state.disableButton) {
        submitButton = <input  onClick={this.handleSubmit} className="button1"
                type="button" disabled value="Submit" /> 
      }
      else {
        submitButton = <input  onClick={this.handleSubmit} className="button1"
                type="button" value="Submit" />
      }
    }
    else {
      if (this.state.disableButton) {
        submitButton = <input  onClick={this.handleNext} disabled className="button1"
        type="button" value="Next" />      
      }
      else {
        submitButton = <input  onClick={this.handleNext} className="button1"
        type="button" value="Next" />      
      }
      
    }

    return (
    <div>
      <Header trainingBtn={null} handleFontSizeChange={false}/>
      <div style={{width: "100%",  float: "left", marginLeft: "30px", textAlign: "left", marginBottom:"50px"}}>
        <TextSliderPanel 
          inputId={this.state.inputIdList[this.state.exampleIndex]}
          inputStmt={this.state.inputStmtList[this.state.exampleIndex]}
          paraphraseStmt={this.state.paraphraseStmtList[this.state.exampleIndex]}
          sliderValue={this.state.sliderValueList[this.state.exampleIndex]}
          errorMessage={this.state.errorMessageList[this.state.exampleIndex]}
          questionHandler={this.handleAnswerStatementUpdate}
          sliderHandler={this.handleSliderUpdate}
        />
      </div>
      <div style={{width: "100%", marginLeft: "30px", marginBottom: "60px"}}>
        {submitButton}
      </div>
      <div></div>
      <div style={{width: "50%", marginLeft: "30px"}}>
        <TextField 
          id="comment" 
          helperText="Comments (if any)"  
          fullWidth 
          value={this.state.commentInputList[this.state.exampleIndex]}
          onChange={(event) => this.handleCommentUpdate(event)}></TextField>
      </div>
    </div>
    );
  }
}

export default App;
