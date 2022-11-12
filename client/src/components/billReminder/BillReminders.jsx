import React, { useState, useEffect } from "react";
import moment from "moment";
import Button from "@mui/material/Button";
import ConfirmationModal from "./ConformationModal";
import AddReminderModal from "./AddReminder";
import styles from "./BillReminders.module.scss";
import { getBillReminders, updateBillReminder } from './../../services/BillReminder';

const Tag = ({message}) => {
    return (
        <div className={`${styles.tag} ${message==="paid" ? styles.paid : (message==="late" ? styles.late : styles.pending)}`}>
        {message}
        </div>
    );
}

//create a bill reminder component
export default function BillReminders() {
    const [billReminders, setBillReminders] = useState([]);
    const [confirmationModalVisibility, setConfirmationModalVisibility] =
        useState(false);
    const [addReminderModalVisibility, setAddReminderModalVisibility] =
        useState(false);
    const [selectedBillReminder, setSelectedBillReminder] = useState(undefined);

    useEffect(() => {
        fetchBillReminder();
    }, []);

    const fetchBillReminder = () => {
        getBillReminders().then(({ status, data }) => {
            if (status === 200) {
                setBillReminders(Object.keys(data).map((key) => { return { id: key, ...data[key] } }));
            }
            else {
                return [];
            }
        });
    }


    const handleUpdateBillReminder = (billReminder) => {
        const updatedBillReminders = billReminders.map((item) => {
            if (item.id === billReminder.id) {
                const daysLeft = moment(billReminder.startDate, "DD-MM-YYYY")
                    .add(billReminder.frequency, billReminder.counter)
                    .diff(moment(), "days");
                if (daysLeft <= 0) {
                    billReminder.paid = false;
                }
                updateBillReminder(billReminder).then((res) => { console.log(res, billReminder) });
                return billReminder;
            }
            return item;
        });
        setBillReminders(updatedBillReminders);
    };

    return (
        <div>
            <h2 style={{textAlign:'center'}}>Bill Reminders</h2>
            <div className="bill-reminders">
                {billReminders.map((billReminder, index) => {
                    const dueDate = moment(billReminder.startDate, "DD-MM-YYYY").add(billReminder.counter + 1, billReminder.frequency);
                    const daysLeft = dueDate.diff(moment(), "days");
                    return (
                        <div
                            className={`${styles.billReminder} ${billReminder.paid ? styles.success : (daysLeft <= 0 ? styles.alert : null)}`}
                            key={index}
                            onClick={() => {
                                setSelectedBillReminder(billReminder);
                                setConfirmationModalVisibility(true);
                            }}
                        >
                            <div className={styles.reminderHeaderDiv}>
                                <h4> {billReminder.name}</h4> <Tag message={billReminder.paid ? "paid" : (daysLeft <= 0 ? "late" : "pending")} />
                            </div>
                            <div className="bill-reminder-amount">
                                {billReminder.amount ??
                                    billReminder.serviceProvider}
                            </div>
                            <div className="bill-reminder-daysLeft"></div>
                            {daysLeft >= 0
                                ? daysLeft <= 65
                                    ? `${daysLeft} days left`
                                    : `${dueDate.diff(
                                        moment(),
                                        "months"
                                    )} months left`
                                : `Missed the due date ${Math.abs(
                                    daysLeft
                                )} days before`}
                        </div>
                    );
                })}
            </div>
            <Button onClick={() => setAddReminderModalVisibility(true)} style={{marginLeft:"35%"}} color="primary" variant="contained">
                Add Reminder
            </Button>
            {addReminderModalVisibility && (
                <AddReminderModal
                    visible={addReminderModalVisibility}
                    handleVisiblity={setAddReminderModalVisibility}
                    handleAddBillReminder={(newReminder) => {
                        setBillReminders([...billReminders, newReminder]);
                    }}
                />
            )}
            {confirmationModalVisibility && (
                <ConfirmationModal
                    billReminder={selectedBillReminder}
                    handleUpdateBillReminder={handleUpdateBillReminder}
                    handleVisiblity={setConfirmationModalVisibility}
                    visible={confirmationModalVisibility}
                />
            )}
        </div>
    );
}
