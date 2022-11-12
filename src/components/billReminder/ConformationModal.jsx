import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { addTransaction } from "../../services/Transaction";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ConfirmationModal({
    visible,
    handleVisiblity,
    handleUpdateBillReminder,
    billReminder
}) {
    const [amount, setAmount] = useState(billReminder.amount ?? undefined);
    const [toast, setToast] = useState(false);

    const [confirmLoading, setConfirmLoading] = useState(false);
    const handleCancel = () => {
        handleVisiblity(false);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        const updatedBillReminder = {
            ...billReminder,
            counter: billReminder.counter + 1,
            paid: true
        };
        if (!amount) { setToast(true); return; }
        const newTransaction = { amount, category: billReminder.type, type: "credit", date: new Date(), stmt: `Paid ${billReminder.name}` };
        addTransaction(newTransaction).then((res) => {
            console.log(res);
        });
        handleUpdateBillReminder(updatedBillReminder);
        setConfirmLoading(false);
        handleVisiblity(false);
    };
    return (
        <>
            <Dialog open={visible} onClose={handleCancel}>
                <DialogTitle>{`Pay ${billReminder.name}`}</DialogTitle>
                <DialogContent>
                    {billReminder.type === "Recharge" ||
                        billReminder.type === "Utility Bill" ? (
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Amount"
                            type="nuber"
                            fullWidth
                            variant="standard"
                            value={amount}
                            onChange={(e) => {
                                setAmount(e.target.value);
                            }}
                        />
                    ) : (
                        <DialogContentText>
                            {`Proceed to pay ${billReminder.amount} to ${billReminder.serviceProvider ??
                                billReminder.senderAccNo
                                }`}
                        </DialogContentText>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button style={{ borderRadius: "6px" }} onClick={handleCancel}>
                        Cancel
                    </Button>

                    <Button onClick={handleOk} style={{ borderRadius: "6px" }}>
                        Pay
                    </Button>
                </DialogActions>
            </Dialog>
            {toast && <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={toast}
                onClose={() => setToast(false)}
            ><Alert severity="error">Please enter a valid amount</Alert></Snackbar>}
        </>
    );
}
