import React, {PureComponent} from "react";

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import "./Header.css"

class Header extends PureComponent {
  constructor(props){
    super(props);

    this.state = {
      dialogOpen: props.index === 1,
      index: props.index,
      total: props.total,
    };
  }
  static getDerivedStateFromProps(nextProps, prevState){
    return {dialogOpen: prevState.dialogOpen,
            index: nextProps.index,
            total: nextProps.total}
  }


  handleDialogOpen = () => {
    this.setState({dialogOpen: true});
  }

  handleDialogClose = () => {
    this.setState({dialogOpen: false});
  }

  render() {
    console.log("index: ,", this.state.index)
    console.log("dialogOpen: ,", this.state.dialogOpen)

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography className='appbarSpace' variant="h6" color="inherit">
              Choosing Situations Based on Natural Language: Example {this.state.index} of {this.state.total}
            </Typography>

            <Button color="inherit" onClick={this.handleDialogOpen}>
              Show Instructions
            </Button>
          </Toolbar>
        </AppBar>

        <Dialog open={this.state.dialogOpen} onClose={this.handleDialogClose} aria-labelledby="simple-dialog-title">
          <DialogTitle>Instructions</DialogTitle>
          <Typography className='dialogText'>
            Thank you for participating in this task. You will be asked a question and then have to paraphrase a short passage in your own words.
            
            <ul>
              <li>
              Note that no matter how you answer the question, you will be paid for your participation in this task. 
              </li>
              <li>
              Please paraphrase the statement in your own words using the text box. Pasting content is not allowed. 
              </li>
            </ul>
          </Typography>
        </Dialog>
      </div>
    )
  }
}
export default Header
