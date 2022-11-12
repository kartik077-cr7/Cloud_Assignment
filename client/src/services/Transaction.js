import axios from "axios";
const FIREBASE_URL = "https://banking-dashboard-default-rtdb.firebaseio.com";

export const getTransaction = async () => {
    try {
        const response = await axios.get(`${FIREBASE_URL}/trasactions.json`);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const addTransaction = async (transaction) => {
    try {
        const response = await axios.post(
            `${FIREBASE_URL}/trasactions.json`,
            transaction
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};
