import axios from "axios";
const FIREBASE_URL = 'https://banking-dashboard-default-rtdb.firebaseio.com/';

export const goals = async() => {
    try{
        const response = await axios.get(`${FIREBASE_URL}goals.json`)
        return response;
    }
    catch(error){
        console.log(error);
    }
}

export const changeGoal = async(id,temp_id,collected,title,total) => {

    try{
          const response = await axios.put(`https://banking-dashboard-default-rtdb.firebaseio.com/goals/${id}.json`,{
          collected:  collected,
          id:         temp_id,
          title:      title,
          total:      total
      }) 
    }
    catch(error){
        console.log(error);
    }
}

export const addGoal = async(id,title,total,collected) => {

    try{
         const response = await axios.post(`${FIREBASE_URL}goals.json`, {
             id: id,
             title:title,
             collected:collected,
             total:total
            })
          
            return response;
    }
    catch(error){
        console.log(error);
    }
}