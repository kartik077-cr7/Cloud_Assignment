import React,{useReducer,useState} from 'react';

import GoalContext from './GoalContext';

const defaultGoalState = {
    items: [],
    totalAmount: 0,
    savingAmount: 0,
};

const goalReducer = (state,action) => {

    if(action.type === 'ADD')
    {

    }
    else if(action.type === 'REMOVE')
    {

    }
    else if(action.type === 'UPDATE')
    {

    }

    return defaultGoalState;

}

const GoalProvider = (props) =>{
   
    const [goalState,dispatchGoalAction] = useReducer(
        goalReducer,
        defaultGoalState
    );

    const addItemToGoalHandler = (item) => {
        dispatchGoalAction({type:'ADD',item:item});
    };

    const removeItemFromGoalHandler = (id) => {
        dispatchGoalAction({type:'REMOVE',id:id});
    };

    const updateItemFromGoalHandler = (id) => {
        dispatchGoalAction({typ:'UPDATE',id:id});
    };

    const goalContext = {
        items: goalState.items,
        totalAmount: goalState.totalAmount,
        savingAmount: goalState.savingAmount,
        addItem: addItemToGoalHandler,
        removeItem: removeItemFromGoalHandler,
        updateItem: updateItemFromGoalHandler
    }

    return (
        <GoalContext.Provider value = {goalContext}>
            {props.children}
        </GoalContext.Provider>
    );
};

export default GoalProvider;