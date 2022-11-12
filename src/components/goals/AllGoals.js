import React,{useState, useEffect} from "react";
import { Grid } from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Goal from "./Goal";
import AddGoal from "./AddGoals";
import {goals} from '../../services/getGoals';
import {useStyles} from './AllGoalsStyles';
import { changeGoal } from "../../services/getGoals";

export default function AllGoals (){

    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const [allGoals,setAllGoals] = useState([]);
    const [count,setCount] = useState(0);
    const maxSteps =  allGoals.length

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const getAllGoals = () =>{
       goals().then((data) => {
         if(data === undefined){
           console.log("undefined data");
         }
         else if(data.data.error){
           console.log("error on getting goals");
         }
         else{
           const item = data.data;
           const savedItems = Object.keys(item).map((key) => [key,item[key]] );   
           console.log(savedItems);
           setAllGoals(savedItems);
         }
       })
    }

    useEffect(() => {
         getAllGoals();
    },[])

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
    const handleBack = () => {
       setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const goalChangeHandler = (id,id_tmp,collected,title,total) => {
      changeGoal(id,id_tmp,collected,title,total);
      
      const newSavedItems = allGoals.map((item) => {
        if(item[0] === id)
        {
             item[1].collected = collected;
             item[1].total = total;
             return item;
        }
        else 
          return item;
      });

      setAllGoals(newSavedItems);
    };

    if(allGoals.length === 0)
    {
      return (
        <div>
          NO GOALS
        </div>
      )
    }

    return (
       
        <div className={classes.root}>
          <h1 style={{textAlign:'center'}}>My Goals</h1>
          <div className={classes.goal}>
            <Grid item >
              <Goal
                  key = {allGoals[activeStep][1].id}
                  id  = {allGoals[activeStep][0]}
                  id_tmp = {allGoals[activeStep][1].id}
                  title = {allGoals[activeStep][1].title}
                  total = {parseInt(allGoals[activeStep][1].total)}
                  collected = {parseInt(allGoals[activeStep][1].collected)}
                  onChangeGoal = {goalChangeHandler}
                  />
                <div className={classes.button} onClick={handleOpen}>
                  <AddGoal onAddGoal = {(newGoal) => setAllGoals([...allGoals, newGoal]) }/>
                </div>
            </Grid>
          </div>
          <MobileStepper
            steps={maxSteps}
            position="static"
            variant="text"
            activeStep={activeStep}
            nextButton={
              <Button size="small" onClick = {handleNext} disabled={activeStep === maxSteps - 1}>
                Next
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Back
              </Button>
            }
          />
        </div>
      );
}
