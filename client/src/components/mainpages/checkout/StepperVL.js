import React,{useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DeleveryAddress from '../utils/address/DeleveryAddress'
import { GlobalState } from '../../../GlobalState';
import CartItem from '../utils/cartItem/CartItem';
import PayNow from '../utils/payNow/PayNow';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

export default function StepperVL() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();  

  const [deliveryAddress, setDeliveryAddress] = useState([])
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [grandTotal, setGrandTotal] = useState(0);
  
  function getSteps() {
    return ['Select Delevery Address', 'Conform', 'Select Payment Method'];
  }
  
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <DeleveryAddress setDeliveryAddress={setDeliveryAddress} setActiveStep={setActiveStep}/>
        )
      case 1:
        return(
          <>
            <h5>Delivery Address:</h5>
            <div className="deliveryAddress">
                <p>{deliveryAddress.length !== 0 ? deliveryAddress.Address_Line_1 +", "+deliveryAddress.Address_Line_2+", "+deliveryAddress.Address_Line_3+", "+deliveryAddress.District+", "+deliveryAddress.State+", "+deliveryAddress.Country+", "+deliveryAddress.PIN:"Select a Delivery Address"}</p>
                <button className="button" id="changeAddressButton" onClick={() => {
                  setDeliveryAddress([])
                  setActiveStep((prevActiveStep) => prevActiveStep - 1);
                }}>Change Address</button>
            </div>

            <CartItem cart={cart} grandTotal={grandTotal} setGrandTotal={setGrandTotal}/>
            <div className="grandTotal">
              <p>Total Items: <span>{cart.length}</span></p>
              <p>Total Amount: <span>Rs. {grandTotal}</span></p>
            </div>    
            <div className={classes.actionsContainer}>
                <div id="conformBtn">                  
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className="button"                    
                  >
                   Confirm
                  </Button>
                </div>
              </div>
          </>
        )
      case 2:
        return (
          <>
            <PayNow deliveryAddress={deliveryAddress} setDeliveryAddress={setDeliveryAddress}
            cart={cart} setCart={setCart} grandTotal={grandTotal} setGrandTotal={setGrandTotal}
            handleNext={handleNext}/>

            <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button> */}
                </div>
              </div>
          </>
        )
      default:
        return 'Unknown step';
    }
  }
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>              
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography><Link to="/history" id="paymentSuccess">Order Placed Successful !!!</Link></Typography>
          <Typography id="goToHistory">Click(^) to -Go to History</Typography>
          {/* <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button> */}
        </Paper>
      )}
    </div>
  );
}
