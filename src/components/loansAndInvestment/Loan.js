import React from 'react';

const Loan = (props) =>{

    const DUMMY_LOANS =  props.data;
    return (
        <div className="loan">
          <table>
                <thead>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Total Loan</th>
                    <th>Interest</th>
                    <th>Tenure</th>
                    <th>EMI</th>
                </thead>
                <tbody>
                    {DUMMY_LOANS.map((data) => (
                       
                       <tr>
                        <td>{data.type}</td>
                        <td>{data.date}</td>
                        <td>{data.total_loan}</td>
                        <td>{data.interest}</td>
                        <td>{data.tenure}</td>
                        <td>{data.emi}</td>
                       </tr>

                    ))}
                </tbody>
            </table>
        </div>
    )

}

export default Loan;