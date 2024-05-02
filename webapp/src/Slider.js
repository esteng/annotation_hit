
import { Slider } from "@material-ui/core";
import { withStyles, makeStyles } from '@material-ui/core/styles';


const styles = {
  root: {
    width: 400, // specify the width of the slider here
  },
  rail: {
    height: 5,
  },
  track: {
    height: 5,
  },
  mark: {
    height: 15,
    transform: 'translateY(-35%)',
    opacity: 1,
    backgroundColor: "black"
  },
  markLabel: {
    fontSize: "20px",
    whiteSpace: 'pre-wrap', // add this line to enable wrapping
    transform: 'translateX(-25%)',
    opacity: 1,
    color: "black",
    
  },
  
  // thumb: {
  //     borderRadius: "30px",
  // },
};

function CustomSlider(props) {
  const { classes, ...other } = props;  

  return (
    <Slider
      classes={{
        root: classes.root,
        thumb: classes.thumb,
        rail: classes.rail,
        track: classes.track,
        mark: classes.mark,
        markLabel: classes.markLabel,
        markActive: classes.markActive,
      }}
      
      valueLabelDisplay="off"
      // valueLabelTransform={valueLabelTransform}
      {...other}
    />
  );
}

export default withStyles(styles)(CustomSlider);