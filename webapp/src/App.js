import './App.css';
import React, { Component } from 'react';
import mock from './mock.json';
import Header from './Header'
import RadioSliderPanel from './RadioSliderPanel'
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
    console.log("hidden submit", el)
    if (el) {
      console.log("hidden submit is not none")
      // if el is not null, than this code is loaded by Turkle.
      el.style.display = 'none';
      // hide the other inputs as well 
      var choiceInputList = document.querySelector("#choiceInputList")
      choiceInputList.style.display = "none"
      var commentInputList = document.querySelector("#commentInputList")
      commentInputList.style.display = "none"
      var otherJustificationList = document.querySelector("#otherJustificationList")
      otherJustificationList.style.display = "none"
      var qidList = document.querySelector("#qidList")
      qidList.style.display = "none"

      var exampleIndexInput = document.querySelector("#exampleIndex");
      // initialize with 0 at the start of the HIT
      exampleIndexInput.value = 0;   
      var exampleIndexInputNow = document.querySelector("#exampleIndex");

      exampleIndex = exampleIndexInput.value
      exampleIndexInput.style.display = "none"
      


      const inputQuestionList = window.inputQuestionList;
      const inputAnswerList = window.inputAnswerList;
      const inputQuestionIdList = window.inputQuestionIdList;

      var empty_str_list = []
      var empty_choice_list = []
      var empty_how_choice_list = []
      var empty_list_list = []
      var value_list = []
      var inputIdList = []
      for (var i = 0; i < inputQuestionList.length; i++) {
        empty_choice_list.push("other")
        empty_how_choice_list.push("none")
        empty_str_list.push("")
        empty_list_list.push([])
        value_list.push(50)
        inputIdList.push(i)
      }
      
      var maxLength = inputQuestionList.length - 1;

      this.state = {
        maxLength: maxLength,
        inputQuestionList: inputQuestionList,
        inputAnswerList: inputAnswerList,
        inputIdList: inputIdList,
        inputQuestionIdList: inputQuestionIdList,
        choiceList: JSON.parse(JSON.stringify(empty_choice_list)),
        howChoiceList: JSON.parse(JSON.stringify(empty_how_choice_list)),
        sliderValueList: JSON.parse(JSON.stringify(value_list)),
        sliderValueHistoryList: JSON.parse(JSON.stringify(empty_list_list)),
        commentInputList: JSON.parse(JSON.stringify(empty_str_list)),
        otherJustificationList: JSON.parse(JSON.stringify(empty_str_list)),
        errorMessageList: JSON.parse(JSON.stringify(empty_str_list)),
        exampleIndex: 0,
      };

    } 
    else {
      console.log("hidden submit is none")
      // this code is executed independently, not inside Turkle.
      const {inputQuestionList, inputAnswerList} = mock;
     
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
      var value_list = []
      var choiceList = []
      var howChoiceList = []
      for (var i = 0; i < inputQuestionList.length; i++) {
        choiceList.push("other")
        howChoiceList.push("none")
        empty_str_list.push("")
        empty_list_list.push([])
        inputIdList.push(i)
        value_list.push(50)
      }
      var maxLength = inputQuestionList.length - 1

      this.state = {
        maxLength: maxLength,
        inputQuestionList: inputQuestionList,
        inputAnswerList: inputAnswerList,
        inputIdList: inputIdList,
        choiceList: JSON.parse(JSON.stringify(choiceList)),
        howChoiceList: JSON.parse(JSON.stringify(howChoiceList)),
        sliderValueList: JSON.parse(JSON.stringify(value_list)),
        sliderValueHistoryList: JSON.parse(JSON.stringify(empty_list_list)),
        commentInputList: JSON.parse(JSON.stringify(empty_str_list)),
        otherJustificationList: JSON.parse(JSON.stringify(empty_str_list)),
        errorMessageList: JSON.parse(JSON.stringify(empty_str_list)),
        exampleIndex: 0,
      };
    }
    this.originalState = JSON.parse(JSON.stringify(this.state))

  }
 
  checkButton = event => {
    var errorMessageList = this.state.errorMessageList;
    if (this.state.sliderValueHistoryList[this.state.exampleIndex].length < 1) {
      errorMessageList[this.state.exampleIndex] = "Please adjust the confidence";
      this.setState({"errorMessageList": errorMessageList});
      event.preventDefault();
      return [event, false];
    }
    console.log(this.state.choiceList[this.state.exampleIndex])
    if (this.state.choiceList[this.state.exampleIndex] === "other") {
      errorMessageList[this.state.exampleIndex] = "Please accept or reject";
      this.setState({"errorMessageList": errorMessageList});
      event.preventDefault();
      return [event, false];
    }
    console.log(this.state.howChoiceList[this.state.exampleIndex])
    if (this.state.howChoiceList[this.state.exampleIndex] === "none") {
      errorMessageList[this.state.exampleIndex] = "Please give a reason";
      this.setState({"errorMessageList": errorMessageList});
      event.preventDefault();
      return [event, false];
    }

    if ((this.state.howChoiceList[this.state.exampleIndex] === "other") && (this.state.otherJustificationList[this.state.exampleIndex] === "")){
      errorMessageList[this.state.exampleIndex] = "Please fill in a reason";
      this.setState({"errorMessageList": errorMessageList});
      event.preventDefault();
      return [event, false];
    }
    return [event, true];
  }

  handleSubmit = event => {
    console.log(this.state.sliderValueList);
    var event_and_allow_next = this.checkButton(event);
    event = event_and_allow_next[0];
    console.log("in submit event is ", event);
    // stringify state 
    var choiceList = document.querySelector("#choiceInputList")
    if (choiceList) {
      choiceList.value = JSON.stringify(this.state.choiceList);
      console.log("put choices list");
    }
    var sliderValueList = document.querySelector("#sliderValueInputList")
    if (sliderValueList) {
      sliderValueList.value = JSON.stringify(this.state.sliderValueList);
      console.log("put slider values");
    }

    var commentInputList = document.querySelector("#commentInputList")
    if (commentInputList) {
      commentInputList.value = JSON.stringify(this.state.commentInputList);
      console.log("put comments");
    }
    var otherJustificationList = document.querySelector("#otherJustificationList")
    if (otherJustificationList) {
      otherJustificationList.value = JSON.stringify(this.state.otherJustificationList);
      console.log("put comments");
    }
    var qidList = document.querySelector("#qidList")
    if (qidList) {
      qidList.value = JSON.stringify(this.state.inputQuestionIdList);
      console.log("put inputQuestionIdList");
    }
    var hiddenSubmit = document.querySelector("#hiddenSubmit");
    hiddenSubmit.click();
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

  handleOtherJustificationUpdate = (event) => {
    var otherJustificationList = this.state.otherJustificationList
    otherJustificationList[this.state.exampleIndex] = event.target.value
    this.setState({"otherJustificationList": otherJustificationList})
  }

  handleSliderUpdate = (event, newValue) => {
      var sliderValueList = this.state.sliderValueList;
      sliderValueList[this.state.exampleIndex] = newValue;
      var sliderValueHistoryList = this.state.sliderValueHistoryList;
      sliderValueHistoryList[this.state.exampleIndex].push(newValue);
      this.setState({"sliderValueList": sliderValueList,
                    "sliderValueHistoryList": sliderValueHistoryList});
  };

  handleRadioUpdate = (event) => {
    console.log(event.target.value);
    var choiceList = this.state.choiceList;
    choiceList[this.state.exampleIndex] = event.target.value;
    this.setState({"choiceList": choiceList})
  };
  handleHowRadioUpdate = (event) => {
    console.log(event.target.value);
    var howChoiceList = this.state.howChoiceList;
    howChoiceList[this.state.exampleIndex] = event.target.value;
    this.setState({"howChoiceList": howChoiceList})
  };


  render() {
    var submitButton;
    if (this.state.exampleIndex === this.state.maxLength) {
      submitButton = <input  onClick={this.handleSubmit} className="button1"
      type="button" value="Submit" />
    }
    else {
      submitButton = <input  onClick={this.handleNext} className="button1"
      type="button" value="Next" />      
    }

    var errorMessage;
    if (this.state.errorMessageList[this.state.exampleIndex]) {
      errorMessage = <div style={{color: "red"}}>{this.state.errorMessageList[this.state.exampleIndex]}</div>
    }
    if (this.state.choiceList[this.state.exampleIndex] === "") {
      errorMessage = <div style={{color: "red"}}>{this.state.errorMessageList[this.state.exampleIndex]}</div>
    }
    if (this.state.howChoiceList[this.state.exampleIndex] === "") {
      errorMessage = <div style={{color: "red"}}>{this.state.errorMessageList[this.state.exampleIndex]}</div>
    }
    console.log(this.state.lfZeroList)
    return (
    <div>
      <div style={{marginBottom: "50px"}}>
      <Header trainingBtn={null} handleFontSizeChange={false} index={this.state.exampleIndex+1} total={this.state.maxLength + 1}/>
      </div>
      <div style={{width: "100%",  float: "left", marginLeft: "30px", textAlign: "left", marginBottom:"50px"}}>
        <RadioSliderPanel 
          inputId={this.state.inputIdList[this.state.exampleIndex]}
          inputQuestion={this.state.inputQuestionList[this.state.exampleIndex]}
          inputAnswer={this.state.inputAnswerList[this.state.exampleIndex]}
          sliderValue={this.state.sliderValueList[this.state.exampleIndex]}
          errorMessage={this.state.errorMessageList[this.state.exampleIndex]}
          radioHandler={this.handleRadioUpdate}
          howRadioHandler={this.handleHowRadioUpdate}
          sliderHandler={this.handleSliderUpdate}
          otherJustificationHandler={this.handleOtherJustificationUpdate}
          choice={this.state.choiceList[this.state.exampleIndex]}
          howChoice={this.state.howChoiceList[this.state.exampleIndex]}
        />
      </div>
      <div style={{marginLeft: "30px"}}>{errorMessage}</div>
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
