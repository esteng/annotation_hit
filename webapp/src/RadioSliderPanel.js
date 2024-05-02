import { FormControl, FormControlLabel, RadioGroup, Radio, FormLabel, Button, TextField, Typography } from "@material-ui/core";
import React from "react";
import "./TextSliderPanel.css";
import CustomSlider from './Slider';


class RadioSliderPanel extends React.Component {
    constructor(props) {
      super(props);

      var accept_checked = props.choice === "accept" ? true : false
      var reject_checked = props.choice === "reject" ? true : false
      this.state = {
        inputQuestion: props.inputQuestiono,
        inputAnswer: props.inputAnswer,
        accept_checked: accept_checked,
        reject_checked: reject_checked,
        sliderValue: props.sliderValue,
        errorMessage: props.errorMessage,
        choice: props.choice,
        howChoice: props.howChoice
      };

      this.radioHandler = props.radioHandler
      this.howRadioHandler = props.howRadioHandler
      this.sliderHandler = props.sliderHandler
      this.otherJustificationHandler = props.otherJustificationHandler
    }

    static getDerivedStateFromProps(nextProps, prevState){
      var reject_checked = nextProps.choice === "reject" ? true : false
      var accept_checked = nextProps.choice === "accept" ? true : false
      console.log(accept_checked, accept_checked)
      console.log("nextProps.choice: ", nextProps.choice)
      return {inputQuestion: nextProps.inputQuestion,
              inputAnswer: nextProps.inputAnswer,
                accept_checked: accept_checked,
                reject_checked: reject_checked,
                choice: nextProps.choice,
                howChoice: nextProps.howChoice,
                sliderValue: nextProps.sliderValue,
                errorMessage: nextProps.errorMessage}
    }

    render() {
        console.log("choice: ", this.state.choice)

        var marks = [
            {
              value: 50,
              label: 'not confident \nat all',
            },
            {
              value: 75,
              label: 'somewhat \nconfident',
            },
            {
              value: 100,
              label: 'very \nconfident',
            },
          ];

        var formContent;
        formContent = <div><div>
            <FormControlLabel 
                value="accept" 
                control={<Radio />} 
                label={<Typography style={{fontSize: '18px'}}>Accept</Typography>} 
                checked={this.state.choice === "accept" ? true : false}
            />
            </div>
            <div>
            <FormControlLabel 
                value="reject" 
                control={<Radio />} 
                label={<Typography style={{fontSize: '18px'}}>Reject</Typography>} 
                checked={this.state.choice === "reject" ? true : false}
            />
            </div>
        </div>

        var knowledgeContent;
        knowledgeContent = <div><div>
            <FormControlLabel 
                value="how" 
                control={<Radio />} 
                label={<Typography style={{fontSize: '18px'}}>I chose my answer based on how Teammate phrased their response</Typography>} 
                checked={this.state.howChoice === "how" ? true : false}
            />
            </div>
            <div>
            <FormControlLabel 
                value="what" 
                control={<Radio />} 
                label={<Typography style={{fontSize: '18px'}}>I chose my answer because I know the right answer to the question</Typography>} 
                checked={this.state.howChoice === "what" ? true : false}
            />
            </div>
            <div>
            <FormControlLabel 
                value="other" 
                control={<Radio />} 
                label={<Typography style={{fontSize: '18px'}}>Other (please specify):</Typography>} 
                checked={this.state.howChoice === "other" ? true : false}
            />
            {
                this.state.howChoice === "other" ? 
                <TextField
                    id="other_justification"
                    helperText="Reason for your choice"
                    value={this.state.otherJustification}
                    onChange={this.otherJustificationHandler}
                    variant="outlined"
                    style={{width: "100%"}}
                /> : null
            }
            </div>
        </div>


        return (

            

            <div>
                <div style={{marginBottom: "30px"}}>
                <Typography variant = "h6" align="left"><b>Part 1:</b> Would you accept the following answer? </Typography>
                </div>
                <div>
                    <Typography variant="h6" align="left">
                        <b> Question: </b> <i>{this.state.inputQuestion}</i>
                        <br/>
                        <b> Teammate's Answer: </b> <i>{this.state.inputAnswer}</i>
                    </Typography> 
                    <div style={{width: "50%"}}>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label"> </FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            onChange = {(event) => this.radioHandler(event)}
                            default={this.state.choice}
                            // TODO: Link this so that it resets for each example
                        >  
                        {formContent} 
                            
                        </RadioGroup>
                    </FormControl>
                    </div>
                </div>
                <div style={{marginTop: "30px", marginLeft: "0px"}}>
                <Typography variant='h6'><b>Part 2:</b> How confident are you in your answer? </Typography>
                </div>
                <div class="slider" style={{marginBottom: "100px"}}>
                    <CustomSlider
                        className="customSlider"
                        aria-label="Confidence" 
                        value={this.state.sliderValue} 
                        onChange={this.sliderHandler} 
                        marks={marks}
                        min={50}
                        max={100}
                        valueLabelDisplay="off"
                    />
                </div>
                <div>
                <Typography variant = "h6" align="left"><b>Part 3:</b> Why did you choose to accept/reject? </Typography>
                </div>
                <div style={{width: "50%", marginBottom: "0px"}}>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label"> </FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        onChange = {(event) => this.howRadioHandler(event)}
                        default={this.state.howChoice}
                        // TODO: Link this so that it resets for each example
                    >  
                    {knowledgeContent} 
                        
                    </RadioGroup>
                </FormControl>
                </div>
            </div>
            );
    }
}

export default RadioSliderPanel;