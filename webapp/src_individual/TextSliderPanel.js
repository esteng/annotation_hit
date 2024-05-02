import { Button, TextField, Typography } from "@material-ui/core";
import React from "react";
import "./TextSliderPanel.css";
import CustomSlider from './Slider';


class TextSliderPanel extends React.Component {
    constructor(props) {
      super(props);
      console.log(props);
      this.state = {
        inputStmt: props.inputStmt,
        paraphraseStmt: props.paraphraseStmt,
        sliderValue: props.sliderValue,
        errorMessage: props.errorMessage
      };

      this.questionHandler = props.questionHandler
    }

    handleSliderUpdate = (event, newValue) => {
        console.log(newValue)
        this.setState({"sliderValue": newValue});
        console.log(this.state);
    };

    static getDerivedStateFromProps(nextProps, prevState){
        return {inputStmt: nextProps.inputStmt,
                paraphraseStmt: nextProps.paraphraseStmt,
                sliderValue: prevState.sliderValue,
                errorMessage: nextProps.errorMessage}
    }

    render() {
        var helperText = "Paraphrase of statement (1-2 sentences max.)" 
        console.log(this.state.inputStmt);
        return (
            <div>
                <div>
                    <Typography variant="h5" align="left">
                        <b> Statement: </b> {this.state.inputStmt}
                    </Typography> 
                    <div style={{width: "50%"}}>
                        <TextField 
                            id={this.state.inputId}
                            // helperText="Paraphrase of statement (1-2 sentences max.)" 
                            helperText={this.state.errorMessage ? this.state.errorMessage : helperText}
                            variant="outlined" 
                            fullWidth
                            margin="dense"
                            multiline
                            minRows={2}
                            onChange={(event) => this.questionHandler(event)}
                        />
                    </div>
                </div>
                <div>
                <Typography variant='h6'> Confidence </Typography>
                </div>
                <div>
                    <CustomSlider
                        className="customSlider"
                        aria-label="Confidence" 
                        value={this.state.sliderValue} 
                        onChange={this.handleSliderUpdate} 
                        min={0}
                        max={100}
                        valueLabelDisplay="on"
                        // thumbClassName="customSlider-thumb"
                    />
                </div>
            </div>
            );
    }
}

export default TextSliderPanel;