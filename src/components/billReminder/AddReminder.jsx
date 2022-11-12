import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import DateRangePicker from "@mui/lab/DateRangePicker";
import Box from "@mui/material/Box";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import styles from "./BillReminders.module.scss";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { addBillReminder } from './../../services/BillReminder';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddReminderModal({
    visible,
    handleVisiblity,
    handleAddBillReminder
}) {
    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [frequency, setFrequency] = useState("");
    const [serviceProvider, setServiceProvider] = useState("");
    const [senderAccNo, setSenderAccNo] = useState("");
    const [toast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");

    const handleSubmit = () => {
        if (!name || !startDate || !endDate || !frequency || !type) { setToast(true); setToastMessage("Please fill all the fields"); setToastType("error"); return; }
        let newReminder = {
            type,
            name,
            startDate,
            endDate,
            frequency,
            counter: 0,
            paid: false,
        };
        if (type === "Recharge" || type === "Utility Bill") {
            if (!serviceProvider) { setToast(true); setToastMessage("Please fill all the fields"); setToastType("error"); return; }
            newReminder = { ...newReminder, serviceProvider }
        }
        else {
            if (!amount || !senderAccNo) { setToast(true); setToastMessage("Please fill all the fields"); setToastType("error"); return; }
            newReminder = { ...newReminder, senderAccNo, amount }
        }
        //TODO: Push it into the database
        addBillReminder(newReminder).then((res) => {
            newReminder = { id: res.data.name, ...newReminder }

        }).catch((err) => { console.log(err) });
        handleAddBillReminder(newReminder);
        setToast(true); setToastMessage("Bill reminder added successfully"); setToastType("success");
        handleVisiblity(false);
    };

    const handleClose = () => {
        handleVisiblity(false);
    };

    return (
        <Dialog open={visible} onClose={handleClose}>
            <DialogTitle>Add reminder</DialogTitle>
            <DialogContent>
                <div className={styles.formDiv}>
                    <InputLabel id="demo-simple-select-helper-label">
                        Type
                    </InputLabel>
                    <Select
                        id="standard-select-currency-native"
                        select
                        label="Native select"
                        value={type}
                        label="Type"
                        variant="standard"
                        style={{ width: "100%" }}
                        onChange={(e) => {
                            setType(e.target.value);
                        }}
                    >
                        <MenuItem value={"Recharge"}>Recharge</MenuItem>
                        <MenuItem value={"Utility Bill"}>
                            Utility Bill
                        </MenuItem>
                        <MenuItem value={"EMI"}>EMI</MenuItem>
                        <MenuItem value={"Others"}>Others</MenuItem>
                    </Select>
                </div>
                <div className={styles.formDiv}>
                    <InputLabel id="demo-simple-select-helper-label">
                        Name
                    </InputLabel>
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        fullWidth
                        variant="standard"
                    />
                </div>
                <div className={styles.formDiv}>
                    <InputLabel id="demo-simple-select-helper-label">
                        Frequency
                    </InputLabel>
                    <Select
                        required
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={frequency}
                        style={{ width: "100%" }}
                        label="Frequency"
                        variant="standard"
                        onChange={(e) => {
                            setFrequency(e.target.value);
                        }}
                    >
                        <MenuItem value={"days"}>Daily</MenuItem>
                        <MenuItem value={"weeks"}>Weekly</MenuItem>
                        <MenuItem value={"months"}>Monthly</MenuItem>
                        <MenuItem value={"quarters"}>Quaterly</MenuItem>
                        <MenuItem value={"years"}>Yearly</MenuItem>
                    </Select>
                </div>
                <div className={styles.formDiv}>
                    <InputLabel id="demo-simple-select-helper-label">
                        Repeat Duration
                    </InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateRangePicker
                            required
                            calendars={1}
                            value={[startDate, endDate]}
                            onChange={(newValue) => {
                                setStartDate(newValue[0]);
                                setEndDate(newValue[1]);
                            }}
                            renderInput={(startProps, endProps) => (
                                <React.Fragment>
                                    <TextField {...startProps} placeholder="From..." />
                                    <Box sx={{ mx: 2 }}> to </Box>
                                    <TextField {...endProps} placeholder="To..." />
                                </React.Fragment>
                            )}
                        />
                    </LocalizationProvider>
                </div>
                {type === "Recharge" || type === "Utility Bill" ?
                    <div className={styles.formDiv}>
                        <InputLabel id="demo-simple-select-helper-label">
                            Service Provider
                        </InputLabel>
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={serviceProvider}
                            onChange={(e) => {
                                setServiceProvider(e.target.value);
                            }}
                        />
                    </div> : (
                        <div>
                            <div className={styles.formDiv}>
                                <InputLabel id="demo-simple-select-helper-label">
                                    Amount
                                </InputLabel>
                                <TextField
                                    required
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    type="nuber"
                                    fullWidth
                                    variant="standard"
                                    value={amount}
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                    }}
                                />
                            </div>
                            <div className={styles.formDiv}>
                                <InputLabel id="demo-simple-select-helper-label">
                                    Sender Account Number
                                </InputLabel>
                                <TextField
                                    required
                                    fullWidth
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    type="nuber"
                                    fullWidth
                                    variant="standard"
                                    value={senderAccNo}
                                    onChange={(e) => {
                                        setSenderAccNo(e.target.value);
                                    }}
                                />

                            </div>
                        </div>
                    )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Add</Button>
            </DialogActions>
            {toast && <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={toast}
                onClose={() => setToast(false)}
            ><Alert severity={toastType}>{toastMessage}</Alert></Snackbar>}
        </Dialog>
    );
}
