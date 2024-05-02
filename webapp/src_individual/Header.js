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
      dialogOpen: false,
    };
  }


  handleDialogOpen = () => {
    this.setState({dialogOpen: true});
  }

  handleDialogClose = () => {
    this.setState({dialogOpen: false});
  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography className='appbarSpace' variant="h6" color="inherit">
              Paraphrasing Statements in Natural Language
            </Typography>


            <Button color="inherit" onClick={this.handleDialogOpen}>
              Show Instructions
            </Button>
          </Toolbar>
        </AppBar>

        <Dialog open={this.state.dialogOpen} onClose={this.handleDialogClose} aria-labelledby="simple-dialog-title">
          <DialogTitle>Instructions</DialogTitle>
          <Typography className='dialogText'>
            Thank you for participating in this task. You will see a series of simple English statements. 
            Your first task is to <b>paraphrase</b> the statement as best you can. 
            <br/>
            Try to make your paraphrases simple but clear. 
            One way to do this is to describe the situation you picture in your head after reading the statement. 
            The paraphrase should be unambiguous and clearly specify what you think the statement means. 
            <br/> 
            <br/> 
            In the second step, please give the <b>confidence</b> you have in your paraphrase using the sliding bar. 
            This confidence should reflect how likely it is that your paraphrase captures the intended meaning behind the statement.
            If, for example, you felt that the statement could be interpreted another way, you might lower your confidence.  
            If, on the other hand, you feel that your paraphrase captures the only possible way to interpret the statement, then you would set it to be very high. 

            <br/> 
            <br/> 
            Interface Notes: 
            <ul>
              <li> Please type your answers out in the text box, and do not copy-paste them from external sources. </li>
            </ul>
          </Typography>
        </Dialog>
      </div>
    )
  }
}
export default Header
