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
    if (el) {
      // if el is not null, than this code is loaded by Turkle.
      el.style.display = 'none';
      // hide the other inputs as well 
      var choiceInputList = document.querySelector("#choiceInputList")
      choiceInputList.style.display = "none"
      var commentInputList = document.querySelector("#commentInputList")
      commentInputList.style.display = "none"
      var exampleIndexInput = document.querySelector("#exampleIndex");
      // initialize with 0 at the start of the HIT
      exampleIndexInput.value = 0;   
      var exampleIndexInputNow = document.querySelector("#exampleIndex");

      exampleIndex = exampleIndexInput.value
      exampleIndexInput.style.display = "none"
      


      const inputStmtList = window.inputStmtList;
      const lfZeroList = window.lfZeroList;
      const lfOneList = window.lfOneList;

      var empty_str_list = []
      var empty_choice_list = []
      var empty_list_list = []
      var value_list = []
      var inputIdList = []
      for (var i = 0; i < inputStmtList.length; i++) {
        empty_choice_list.push("other")
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
        lfZeroList: lfZeroList,
        lfOneList: lfOneList,
        choiceList: JSON.parse(JSON.stringify(empty_choice_list)),
        sliderValueList: JSON.parse(JSON.stringify(value_list)),
        sliderValueHistoryList: JSON.parse(JSON.stringify(empty_list_list)),
        commentInputList: JSON.parse(JSON.stringify(empty_str_list)),
        commentHistoryList: JSON.parse(JSON.stringify(empty_list_list)),
        errorMessageList: JSON.parse(JSON.stringify(empty_str_list)),
        exampleIndex: 0,
      };

    } 
    else {
      // this code is executed independently, not inside Turkle.
      const {inputStmtList, lfZeroList, lfOneList} = mock;
     
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
      for (var i = 0; i < inputStmtList.length; i++) {
        choiceList.push("other")
        empty_str_list.push("")
        empty_list_list.push([])
        inputIdList.push(i)
        value_list.push(50)
      }
      var maxLength = inputStmtList.length - 1

      this.state = {
        maxLength: maxLength,
        inputStmtList: inputStmtList,
        inputIdList: inputIdList,
        lfZeroList: lfZeroList,
        lfOneList: lfOneList,
        choiceList: JSON.parse(JSON.stringify(choiceList)),
        sliderValueList: JSON.parse(JSON.stringify(value_list)),
        sliderValueHistoryList: JSON.parse(JSON.stringify(empty_list_list)),
        commentInputList: JSON.parse(JSON.stringify(empty_str_list)),
        commentHistoryList: JSON.parse(JSON.stringify(empty_list_list)),
        errorMessageList: JSON.parse(JSON.stringify(empty_str_list)),
        exampleIndex: 0,
      };
    }
    this.originalState = JSON.parse(JSON.stringify(this.state))

  }
 
  checkButton = event => {
    var errorMessageList = this.state.errorMessageList;
    if (this.state.commentInputList[this.state.exampleIndex].length < 1) {
      errorMessageList[this.state.exampleIndex] = "Please enter a non-empty paraphrase";
      this.setState({"errorMessageList": errorMessageList});
      event.preventDefault();
      return [event, false]
    }
    console.log('history, ',this.state.commentHistoryList[this.state.exampleIndex])
    if (this.state.commentHistoryList[this.state.exampleIndex].length < this.state.commentInputList[this.state.exampleIndex].length) {
      errorMessageList[this.state.exampleIndex] = "No pasting please!";
      this.setState({"errorMessageList": errorMessageList});
      event.preventDefault();
      return [event, false]
    }
    return [event, true];
  }

  handleSubmit = event => {
    var event_and_allow_next = this.checkButton(event);
    event = event_and_allow_next[0];
    // stringify state 
    var choiceList = document.querySelector("#choiceInputList")
    if (choiceList) {
      choiceList.value = JSON.stringify(this.state.choiceList);
    }
    var sliderValueList = document.querySelector("#sliderValueInputList")
    if (sliderValueList) {
      sliderValueList.value = JSON.stringify(this.state.sliderValueList);
    }

    var commentInputList = document.querySelector("#commentInputList")
    if (commentInputList) {
      commentInputList.value = JSON.stringify(this.state.commentInputList);
    }
    var hiddenSubmit = document.querySelector("#hiddenSubmit");
    if (event_and_allow_next[1]) {
      hiddenSubmit.click();
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
      }

    }
  }

  handleReset = () => {
    window.location.reload(false)
  }

  handleCommentUpdate = (event) => {
    var commentInputList = this.state.commentInputList
    var commentHistoryList = this.state.commentHistoryList
    commentInputList[this.state.exampleIndex] = event.target.value
    commentHistoryList[this.state.exampleIndex].push(event.target.value)
    this.setState({"commentInputList": commentInputList,
                  "commentHistoryList": commentHistoryList})
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
    var choiceList = this.state.choiceList;
    choiceList[this.state.exampleIndex] = event.target.value;
    this.setState({"choiceList": choiceList})
  };

  render() {
    var submitButton;
    submitButton = <input  onClick={this.handleSubmit} className="button1"
      type="button" value="Submit" />

    var errorMessage;
    if (this.state.errorMessageList[this.state.exampleIndex]) {
      errorMessage = <div style={{color: "red"}}>{this.state.errorMessageList[this.state.exampleIndex]}</div>
    }
    if (this.state.choiceList[this.state.exampleIndex] === "") {
      errorMessage = <div style={{color: "red"}}>{this.state.errorMessageList[this.state.exampleIndex]}</div>
    }
    console.log(this.state.errorMessageList)
    console.log("index: ", this.state.exampleIndex )
    console.log("error message: ", errorMessage)
    return (
    <div>
      <div style={{marginBottom: "50px"}}>
      <Header trainingBtn={null} handleFontSizeChange={false} index={this.state.exampleIndex+1} total={this.state.maxLength + 1}/>
      </div>
      <div style={{width: "100%",  float: "left", marginLeft: "30px", textAlign: "left", marginBottom:"50px"}}>
        <RadioSliderPanel 
          inputId={this.state.inputIdList[this.state.exampleIndex]}
          inputStmt={this.state.inputStmtList[this.state.exampleIndex]}
          lf0={this.state.lfZeroList[this.state.exampleIndex]}
          lf1={this.state.lfOneList[this.state.exampleIndex]}
          sliderValue={this.state.sliderValueList[this.state.exampleIndex]}
          errorMessage={this.state.errorMessageList[this.state.exampleIndex]}
          radioHandler={this.handleRadioUpdate}
          sliderHandler={this.handleSliderUpdate}
          choice={this.state.choiceList[this.state.exampleIndex]}
        />
      </div>
      <div style={{width: "50%", marginLeft: "30px"}}>
        <TextField 
          id="comment" 
          helperText="Paraphrase"  
          fullWidth 
          value={this.state.commentInputList[this.state.exampleIndex]}
          onChange={(event) => this.handleCommentUpdate(event)}></TextField>
      </div>
      <div style={{marginLeft: "30px"}}>{errorMessage}</div>
      <div style={{width: "100%", marginLeft: "30px", marginBottom: "60px"}}>
        {submitButton}
      </div>
      <div></div>
    </div>
    );
  }
}

export default App;
