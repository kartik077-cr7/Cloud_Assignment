import React from 'react';

const GoalContext = React.createContext({
    items: [],
    totalAmount: 0,
    savingAmount: 0,
    addGoal: () => {},
    editGoal: (id) => {},
    removeGoal: (id) =>{},
});

export default GoalContext;