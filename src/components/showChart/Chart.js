import React, {useState,useEffect} from 'react';
import FilterYear from './FilterYear';
import LineChart from './LineChart';
import { getTransaction } from "../../services/Transaction";
import './Chart.css';

const Chart = () => {

    const [year,setYear] = useState("2022");
    const [allTransactions,setAllTransactions] = useState([]);
    
    const getAllTransaction = () =>{
      getTransaction().then((data) => {
          if(data === undefined){
            console.log("undefined data");
          }
          else if(data.data.error){
            console.log("error on getting goals");
          }
          else{
            const item = data.data;
            const savedItems = Object.keys(item).map((key) => item[key]);  
            console.log(savedItems);  
            setAllTransactions(savedItems);
          }
        })
     }
 
     useEffect(() => {
          getAllTransaction();
     },[])

    var expenses = [];
    var income = [];
    
    var income_dpoints = [];
    var expenses_dpoints = [];

    
    const changeYearHandler = (newYear) => {
         setYear(newYear);
    }

    for(var i = 0 ; i <= 12; i++)
    {
          expenses.push([]);
          income.push([]);
          if(i!=12)
          {
            income_dpoints.push(0);
            expenses_dpoints.push(0);
          }
    }

    if(allTransactions.length > 0)
    {
        console.log(allTransactions.length);
        for(var i = 0 ; i < allTransactions.length ;i++)
        {
            if(allTransactions[i].date.split('-')[0] === year)
            {
                if(allTransactions[i].type === "credit")
                {
                    if(allTransactions[i].date.split('-')[1][0] === '0')
                    {
                    expenses[parseInt(allTransactions[i].date.split('-')[1][1])].push(allTransactions[i]);
                    expenses_dpoints[parseInt(allTransactions[i].date.split('-')[1][1])-1]+=parseInt(allTransactions[i].amount);
                    }
                    else 
                    {
                    expenses[parseInt(allTransactions[i].date.split('-')[1])].push(allTransactions[i]);
                    expenses_dpoints[parseInt(allTransactions[i].date.split('-')[1])-1]+=parseInt(allTransactions[i].amount);
                    }
                }
                else 
                {
                    if(allTransactions[i].date.split('-')[1][0] === '0')
                    {
                    income[parseInt(allTransactions[i].date.split('-')[1][1])].push(allTransactions[i]);
                    income_dpoints[parseInt(allTransactions[i].date.split('-')[1][1])-1]+=allTransactions[i].amount;
                    }
                    else 
                    {
                    income[parseInt(allTransactions[i].date.split('-')[1])].push(allTransactions[i]);
                    income_dpoints[parseInt(allTransactions[i].date.split('-')[1])-1]+=allTransactions[i].amount;   
                    }
                }
            }
        }
    }
 
    return (
         <div className="chart">
              <FilterYear year={year} onSaveYear = {changeYearHandler}/>
              <LineChart 
              expenses = {expenses} 
              expenses_dpoints = {expenses_dpoints} 
              income = {income}
              income_dpoints = {income_dpoints}
              />
         </div >

    )
}

export default Chart;