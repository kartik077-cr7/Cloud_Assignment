import React,{useState} from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const LoanForm = () => {

    const [income,setIncome] = useState(0);
    const [month,setMonth] = useState(0);
    const [amount,setAmount] = useState(0);
    const [toast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");

    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
     });

     
    const predictHandler = () => {
        
      if(!income || !month || !amount)
      {
         setToast(true);
         setToastMessage("Please fill all the fields"); 
         setToastType("error"); 
         return;
      }

      const url = "https://bankingdashboard-server.herokuapp.com/scoreJson";
      
      const bodyData = JSON.stringify({
        "Income":income,
        "Amount":amount,
        "Months":month,
      });

      const reqOpt = {method:"POST",headers:{"Content-type":"application/json"},body:bodyData};

      fetch(url,reqOpt)
      .then((response)=> response.json())
      .then((respJ)=> {
        if(respJ.output === 0)
        {
          setToast(true);
          setToastMessage("Congrats!! You can get loan"); 
          setToastType("success");     
        }
        else
        {
          setToast(true);
          setToastMessage("Sorry!! It's difficult to get Loan"); 
          setToastType("error"); 
        }
      });


      setIncome(0);
      setAmount(0);
      setMonth(0);

    }
    return (
     <div style={{margin:'10px',marginTop:'40px'}}>
         <h2 style={{textAlign:'center'}}>Loan Predictor</h2>
         <TextField
            autoFocus
            margin="dense"
            label="Income (per anum)"
            type="number"
            value = {income}
            onChange = {((event) => setIncome(event.target.value))}
            fullWidth
          />
            <TextField
            autoFocus
            margin="dense"
            label="Loan Amount"
            type="number"
            value = {amount}
            onChange = {((event) => setAmount(event.target.value))}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Loan Tenure (in months)"
            type="number"
            value = {month}
            onChange = {((event) => setMonth(event.target.value))}
            fullWidth
          />
          <Button style={{marginLeft:"35%"}} onClick={predictHandler} color="primary" variant="contained">
             Predict
          </Button>
          {toast && <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={toast}
                onClose={() => setToast(false)}
            ><Alert severity={toastType}>{toastMessage}</Alert></Snackbar>}
     </div>
    );
}

export default LoanForm;