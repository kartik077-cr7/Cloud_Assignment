import axios from "axios";
const FIREBASE_URL = "https://banking-dashboard-default-rtdb.firebaseio.com/";

export const getBillReminders = async () => {
    try {
        const response = await axios.get(`${FIREBASE_URL}bills.json`);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const addBillReminder = async (bill) => {
    try {
        const response = await axios.post(`${FIREBASE_URL}bills.json`, bill);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const updateBillReminder = async (bill) => {
    try {
        const response = await axios.put(
            `${FIREBASE_URL}bills/${bill.id}.json`,
            bill
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};
