import React from 'react'
import moment from 'moment'
const EmployeeTable = ({ id, scannedItems, name, index, lastScan }) => {

    const dateConverter = (date) => {
        const data = new Date(date)
        return data.toLocaleString()
    }
    return (

        <tr>
            <td>{index}</td>
            <td>{name}</td>
            <td>{scannedItems.length === 0 ? 'nil' : scannedItems.length}</td>
            <td>
                {scannedItems.map((item, index) => (
                    <tr key={index} >
                        <td key={index}>{item}</td>
                    </tr>
                ))}
            </td>
            <td>

                {lastScan.map((item, index) => (
                    <tr key={index} >
                        <td key={index}>{dateConverter(item)} / {moment(item).fromNow()}</td>
                    </tr>
                ))}
            </td>

        </tr>



    )
}

export default EmployeeTable