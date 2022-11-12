import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { addGoal } from '../../services/getGoals';
import uuid from 'react-uuid';
import './AddGoals.css';

const AddGoal = (props) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState();
  const [amount,setAmount] = useState();
  const [collected,setCollected] = useState();
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
   });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = async() => {
     
      if(!title || !amount || !collected)
      {
         setToast(true);
         setToastMessage("Please fill all the fields"); 
         setToastType("error"); 
         return;
      }
      else if(amount < collected)
      {
        setToast(true);
        setToastMessage("Amount should be greater than collected"); 
        setToastType("error"); 
        return;
      }
      
      const id = uuid();
      const response = await addGoal(id,title,amount,collected);

      props.onAddGoal([response.data.name,{
        id: id,
        title:title,
        collected:collected,
        total:amount
      }])

      setTitle();
      setAmount();
      setCollected();
      handleClose();
  };

  return (
    <div>
      <Button color="primary" variant="contained" style={{marginLeft:'38%'}}  onClick={handleClickOpen}>Add Goal</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">ADD GOAL</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Goal Title"
            type="text"
            value = {title}
            onChange = {((event) => setTitle(event.target.value))}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Total Amount"
            type="number"
            value = {amount}
            onChange = {((event) => setAmount(event.target.value))}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Amount Collected"
            type="number"
            value = {collected}
            onChange = {((event) => setCollected(event.target.value))}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submitHandler} color="primary">
            Submit
          </Button>
        </DialogActions>
         {toast && <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={toast}
                onClose={() => setToast(false)}
            ><Alert severity={toastType}>{toastMessage}</Alert></Snackbar>}
      </Dialog>
    </div>
  );
}

export default AddGoal;