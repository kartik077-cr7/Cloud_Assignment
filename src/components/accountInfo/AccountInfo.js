import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import {investments} from '../../services/getInvestments';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));

const AccountInfo = () => {

    const [allInvestments,setAllInvestments] = useState([]);
    const classes = useStyles();

    const getAllInvestments = () =>{
        investments().then((data) => {
          if(data === undefined){
            console.log("undefined data");
          }
          else if(data.data.error){
            console.log("error on getting investments");
          }
          else{
            const item = data.data;
            const savedItems = Object.keys(item).map((key) => item[key]);  
            console.log(savedItems);       
            setAllInvestments(savedItems);
          }
        })
     }

     useEffect(() => {
        getAllInvestments();
   },[])

   return (
        <Grid container>
          <Grid item lg = {12} md = {6}>
            <List className={classes.root}>
                {allInvestments.map((investment) => (
                        <ListItem>
                        <ListItemAvatar>
                        <Avatar>
                            <AccountBalanceIcon />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={investment.type} secondary={investment.balance}/>
                    </ListItem>
                ))}
              </List>
          </Grid> 
        </Grid>
   )
    
};

export default AccountInfo;