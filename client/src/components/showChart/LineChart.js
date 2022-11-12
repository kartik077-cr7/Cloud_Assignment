import { Line } from 'react-chartjs-2';

const LineChart = (props) => {

    const expenses = props.expenses;
    const income = props.income;
    const income_dpoints = props.income_dpoints;
    const expenses_dpoints = props.expenses_dpoints;

    const footer = (tooltipItems) =>{

        let footer_str = "";
        
        if(tooltipItems[0].dataset.label === 'Income')
        {
            for(var i = 0 ; i < income[tooltipItems[0].parsed.x+1].length;i++ )
              footer_str += income[tooltipItems[0].parsed.x+1][i].stmt+"     "+income[tooltipItems[0].parsed.x+1][i].amount+"\n";
        }
        else 
        {
            for(var i = 0 ; i < expenses[tooltipItems[0].parsed.x+1].length; i++ )
              footer_str += expenses[tooltipItems[0].parsed.x+1][i].stmt+"     "+expenses[tooltipItems[0].parsed.x+1][i].amount+"\n";
        }
        return footer_str;
    }

    return (
        <Line
                data = {{
                    labels:['Jan','Feb','Mar','Apr','May','Jun','Jul',
                    'Aug','Sept','Oct','Nov','Dec'],

                    datasets:[
                        {
                            label :'Income',
                            data: income_dpoints,
                            backgroundColor:'lightgreen',
                            borderColor: 'green',
                            borderWidth: 1,
                        },
                        {
                            label : 'Expenditure',
                            data: expenses_dpoints,
                            backgroundColor: 'pink',
                            borderColor:'red'
                        }
                    ]
                }}
                options = {{
                    maintainAspectRatio: false,
                    scales:{
                        yAxis:[{
                            ticks:{
                                beginAtZero : true,
                            }
                        }]
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'INCOME V/S Expenditure'
                        },
                        tooltip:{
                            callbacks:{
                                footer : footer
                            },
                            bodyAlign: 'right',
                        }
                    },
                    elements:{
                        line:{
                            tension: 0.3
                        }
                    }
                }}
             />
    )
}


export default LineChart;