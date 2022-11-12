import React,{useState} from "react";
import { Button } from "@material-ui/core";
import axios from "axios";
import './AlterGoals.css';

const AlterGoal = (props) => {

    const submitHandler = async(event) => {
      event.preventDefault();
      props.onSubmitChangeGoal();
    }


    return (
        <div className="alter-div">
          <form>

             <label for="goal">TO ACHIEVE</label>
             <input type = "number" name = "goal" value={props.total} onChange={(event) => props.onChangeTotal(event.target.value)}></input>

             <label for="collected">COLLECTED</label>
             <input type = "number" name = "collected" value={props.collected} onChange={(event) => props.onChangeGoal(event.target.value)}></input>
             
             <Button className="goal-button" variant="contained" color = "primary" size="small" onClick={submitHandler}>
                SUBMIT 
             </Button>
          </form>
        </div>
    )
}

export default AlterGoal;