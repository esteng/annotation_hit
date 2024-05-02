import { FormControl, FormControlLabel, RadioGroup, Radio, FormLabel, Paper, Typography } from "@material-ui/core";
import React from "react";
import "./TextSliderPanel.css";
import CustomSlider from './Slider';


class RadioSliderPanel extends React.Component {
    constructor(props) {
      super(props);

      var lf1_checked = props.choice === "lf1" ? true : false
      var lf0_checked = props.choice === "lf0" ? true : false
      var lf0_first = true;
      this.state = {
        inputStmt: props.inputStmt,
        lf0_first: lf0_first,
        lf0: props.lf0,
        lf1: props.lf1,
        lf1_checked: lf1_checked,
        lf0_checked: lf0_checked,
        sliderValue: props.sliderValue,
        errorMessage: props.errorMessage,
        choice: props.choice
      };

      this.radioHandler = props.radioHandler
      this.sliderHandler = props.sliderHandler
    }

    static getDerivedStateFromProps(nextProps, prevState){
      var lf1_checked = nextProps.choice === "lf1" ? true : false
      var lf0_checked = nextProps.choice === "lf0" ? true : false
      return {inputStmt: nextProps.inputStmt,
                lf0: nextProps.lf0,
                lf1: nextProps.lf1,
                lf1_checked: lf1_checked,
                lf0_checked: lf0_checked,
                choice: nextProps.choice,
                sliderValue: nextProps.sliderValue,
                errorMessage: nextProps.errorMessage}
    }

    render() {

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
        // randomly choose between lf0 first or lf1 first
        if (this.state.lf0_first) {
            formContent = <div><div>
                <FormControlLabel 
                    value="lf0" 
                    control={<Radio />} 
                    label={<Typography style={{fontSize: '22px'}}>{this.state.lf0}</Typography>} 
                    checked={this.state.choice === "lf0" ? true : false}
                />
                </div>
                <div>
                <FormControlLabel 
                    value="lf1" 
                    control={<Radio />} 
                    label={<Typography style={{fontSize: '22px'}}>{this.state.lf1}</Typography>} 
                    checked={this.state.choice === "lf1" ? true : false}
                />
                </div>
            </div>
        } else {
            formContent = <div><div>
            <FormControlLabel 
                value="lf1" 
                control={<Radio />} 
                label={<Typography style={{fontSize: '22px'}}>{this.state.lf1}</Typography>} 
                checked={this.state.choice === "lf1" ? true : false}
            />
            </div>
            <div>
            <FormControlLabel 
                value="lf0" 
                control={<Radio />} 
                label={<Typography style={{fontSize: '22px'}}>{this.state.lf0}</Typography>} 
                checked={this.state.choice === "lf0" ? true : false}
            />
            </div>
        </div>
        }

        const classes = {
            root: {
              width: 300,
            },
            rail: {
              height: 8, // change this value to adjust the thickness of the rail
            },
            track: {
              height: 8, // change this value to adjust the thickness of the track
            },
        };

        return (

            

            <div>
                <div style={{marginBottom: "30px"}}>
                <Typography variant = "h5" align="left">Are you a native speaker of English? </Typography>
                </div>
                <div style={{marginBottom: "30px"}}>
                  <div style={{width: "50%"}}>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label"> </FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            onChange = {(event) => this.radioHandler(event)}
                            default={this.state.choice}
                        >  
                        {formContent} 
                        </RadioGroup>
                    </FormControl>
                    </div>
                </div>
                <div style={{marginBottom: "10px"}}>
                    <Typography variant="h5" align="left">
                      <b>Paraphrase the following passage in 3 sentences of your own writing:</b>
                    </Typography> 
                </div> 
                <div style={{width: "50%"}}>
                  <Paper style={{overflow: "auto", maxHeight: 200}}>
                    <Typography variant="body1" align="left" style={{padding: 16}}>
                    The North Wind and the Sun had a quarrel about which of them was the stronger. 
                    While they were disputing with much heat and bluster, a Traveler passed along the road wrapped in a cloak. <br/>
                    <br/>
                    "Let us agree," said the Sun, "that he is the stronger who can strip that Traveler of his cloak." <br/>
                    <br/>
                    "Very well," growled the North Wind, and at once sent a cold, howling blast against the Traveler. <br/>
                    <br/>
                    With the first gust of wind the ends of the cloak whipped about the Traveler's body. 
                    But he immediately wrapped it closely around him, and the harder the Wind blew, the tighter he held it to him. 
                    The North Wind tore angrily at the cloak, but all his efforts were in vain. <br/>
                    <br/>
                    Then the Sun began to shine. 
                    At first his beams were gentle, and in the pleasant warmth after the bitter cold of the North Wind, 
                    the Traveler unfastened his cloak and let it hang loosely from his shoulders. 
                    The Sun's rays grew warmer and warmer. The man took off his cap and mopped his brow. 
                    At last he became so heated that he pulled off his cloak, and, to escape the blazing sunshine, 
                    threw himself down in the welcome shade of a tree by the roadside. <br/>
                    <br/>

                    </Typography> 
                  </Paper>
                </div>
            </div>
            );
    }
}

export default RadioSliderPanel;