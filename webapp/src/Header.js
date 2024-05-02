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
            Thank you for participating in this task. You will see a series of difficult questions. You will be asked whether to accept an answer to the question. 
            <b> In addition to payment for completing each assignment, you will be eligble for a 50% bonus payment.</b>            
            <br/>
            Imagine you are playing a trivia game. For each question, you will see an answer from your teammate, Teammate.

            <ul>
              <li>
              Your first task is to <b>choose</b> whether to accept Teammate's answer or to reject it. Your bonus is not dependent on how you answer. 
              </li>
              <li>
              Your second task is to use the sliding bar to indicate how <b>confident</b> you are in your choice.
              Note that this bar does not depend on your choice before. If you're very sure the answer should be rejected, you would give a <b> high</b> score, and if you are unsure about accepting the answer you would give a <b> low </b> score.
              </li>
              <li>
              Finally, you will be asked to provide the reason why you picked accept or reject. 
              There are several available reasons to choose from, but you can also provide your own reason.
              </li>
            </ul>
            Interface Notes: 
            <ul>
              <li> There are 20 examples per assignment. Each assignment is estimated to take <b>TODO ELIAS minutes</b>. Please <b> do not refresh </b> while you have accepted an assignment. </li>
              <li> You will be unable to move to the next task if you do not adjust the confidence. Even if you want to provide the lowest possible confidence, you will need to move the slider back and forth once. </li>
            </ul>
          </Typography>
        </Dialog>
      </div>
    )
  }
}
export default Header
