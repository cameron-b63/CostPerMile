import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
/**
 * @param {object} props
 * @returns {object} JSX Element of relational table
 */
function RelationalTable(props) {
    return (

            <Table>
                <thead>
                    <tr>
                        <th>Cost Per Mile contributors</th>
                        <th>Cost Per Mile</th>
                        <th>Cost Through Year</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Total</th>
                        <th>{"$" + props._state.costpermile.toFixed(2)} </th>
                        <th>{"$" + (props._state.costpermile * (parseFloat(props._state.miles) * 52)).toFixed(2)}</th>
                    </tr>
                    <tr>
                        <th>Depreciation</th>
                        <th>${(parseFloat(props._state.depreciationValue) / (parseFloat((props._state.miles) * 52))).toFixed(2)}</th>
                        <th>${(props._state.depreciationValue / 1).toFixed(2)}</th>
                    </tr>
                    <tr>
                        <th>Insurance</th>
                        <th>${(parseFloat(props._state.iPaid) / ((parseFloat(props._state.miles) * 52))).toFixed(2)}</th>
                        <th>${(parseFloat(props._state.iPaid)).toFixed(2)}</th>
                    </tr>
                    {props._state.isElectric === "electric" ?
                        <tr>
                            <th>Charging (Electric)</th>
                            <th>${((((parseFloat(props._state.miles) * 52) / parseFloat(props._state.fullcharge)) * parseFloat(props._state.fullchargeCost)) / (parseFloat(props._state.miles) * 52)).toFixed(2)}</th>
                            <th>${((((parseFloat(props._state.miles) * 52) / parseFloat(props._state.fullcharge)) * parseFloat(props._state.fullchargeCost))).toFixed(2)}</th>
                        </tr>
                        :
                        <tr>
                            <th>Gas</th>
                            <th>${((((parseFloat(props._state.miles) * 52) / parseFloat(props._state.mpg)) * parseFloat(props._state.gallon)) / (parseFloat(props._state.miles) * 52)).toFixed(2)}</th>
                            <th>${((((parseFloat(props._state.miles) * 52) / parseFloat(props._state.mpg)) * parseFloat(props._state.gallon))).toFixed(2)}</th>
                        </tr>
                    }
                    <tr>
                        <th>Maintenance</th>
                        <th>${(parseFloat(props._state.mait) / (parseFloat(props._state.miles) * 52)).toFixed(2)}</th>
                        <th>${(parseFloat(props._state.mait)).toFixed(2)}</th>
                    </tr>

                    <tr>
                        <th>Loans/Rental/Lease</th>
                        <th>${((parseFloat(props._state.monthlyCarPay) * 12) / (parseFloat(props._state.miles) * 52)).toFixed(2)}</th>
                        <th>${((parseFloat(props._state.monthlyCarPay) * 12)).toFixed(2)}</th>
                    </tr>
                    <tr>
                        <th>Other Costs</th>
                        <th>${((parseFloat(props._state.tolls) * 12) / (parseFloat(props._state.miles) * 52)).toFixed(2)}</th>
                        <th>${((parseFloat(props._state.tolls) * 12)).toFixed(2)}</th>
                    </tr>
                </tbody>
            </Table>
            

    )
}
export default RelationalTable;