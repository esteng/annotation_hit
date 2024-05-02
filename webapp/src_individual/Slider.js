
import { Slider } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    width: 400, // specify the width of the slider here
  },
  // thumb: {
  //     borderRadius: "30px",
  // },
};

function CustomSlider(props) {
  const { classes, ...other } = props;

  const valueLabelTransform = (value, index) => {
    const thumb = document.querySelector(`#slider-thumb-${index}`);
    if (thumb) {
      return `translateX(-50%) translateY(-${thumb.clientHeight}px)`;
    }
    return '';
  }; 
  
  

  return (
    <Slider
      classes={{
        root: classes.root,
        thumb: classes.thumb,
      }}
      
      // valueLabelDisplay="on"
      // valueLabelTransform={valueLabelTransform}
      {...other}
    />
  );
}

export default withStyles(styles)(CustomSlider);