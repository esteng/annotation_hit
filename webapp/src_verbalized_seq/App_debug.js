import './App.css';
import React, { Component } from 'react';
import mock from './mock.json';
import Header from './Header'
import RadioSliderPanel from './RadioSliderPanel'
import { TextField } from '@mui/material';
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
    console.log("hidden submit", el)
    if (el) {
      console.log("hidden submit is not none")
      this.state = {nothing:"nothing"}
    } 
    else {
      console.log("hidden submit is none")
      this.state = {nothing: "nothing"}
    }

  }
 

  render() {

    return (
    <div>
      <div style={{marginBottom: "50px"}}>
      <Typography variant="h1">Hello World</Typography>
      </div>
    </div>
    );
  }
}

export default App;
