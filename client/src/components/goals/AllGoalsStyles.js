import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 400,
      height: 485,
      flexGrow: 1,
      marginLeft: 10,
      marginTop:-50,
      marginBottom: 25,
      position: 'relative',
      ["@media (max-width:960px)"]: {
         marginTop: 55,
        height: 500,
      }
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    // button:{
    //   marginLeft:13,
    // },
  }));

  /*    button: {
    marginTop:45,
    ["@media (max-width:960px)"]: { marginTop: 55 }
  }*/