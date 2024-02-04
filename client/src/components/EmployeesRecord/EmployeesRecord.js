import React, { useEffect, useState } from 'react'
import './EmployeesRecord.css'
import axios from 'axios'
import EmployeeTable from './EmployeeTable'
import { Button, Table } from 'react-bootstrap'

const EmployeesRecord = () => {

    const [users, setUsers] = useState(null)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    const getAllUsers = async () => {
        try {
            const res = await axios.get('/api/users/allEmployees')
            setUsers(res.data.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [])
    const handleSearch = (e) => {
        const searchTerm = e.target.value;

        if (searchTerm === '') {
            // If search bar is empty, fetch all items
            getAllUsers();
            setSearch('');
        } else {
            // Filter items by name
            const filteredItems = users.filter(item => item.firstName.includes(searchTerm));
            setUsers(filteredItems);
            setSearch(searchTerm);
        }
    }
    const handleClear = async () => {
        try {
            setLoading(true)
            await axios.get('/api/items/clear')
            alert('Data Successfully Cleared')
            setLoading(false)
            getAllUsers()
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className='card'>
            <h1>Employees Record</h1>
            <div style={{ width: "100%", gap: '20px', margin: 20, display: 'flex', justifyContent: 'space-around' }} className='search_bar'>
                <input value={search} onChange={handleSearch} type="text" placeholder='Search...' />
                <Button onClick={handleClear} variant='danger' size='sm' >Clear All</Button>
            </div>

            <Table striped bordered>
                <thead>
                    <tr>

                        <td>Sr.No</td>
                        <td>Employee Name</td>
                        <td>Total Scanned Items</td>
                        <td>Item Names</td>
                        <td>Scan Date</td>
                    </tr>
                </thead>
                <tbody>
                    {loading ?
                        <tr>
                            <td>Loading...</td>
                        </tr> :
                        users.map((item, index) => (
                            <EmployeeTable lastScan={item.lastScan} index={index + 1} name={item.firstName + ' ' + item.lastName} key={item._id} scannedItems={item.scannedItems} id={item._id} />
                        ))
                    }
                </tbody>
            </Table>

        </div>
    )
}

export default EmployeesRecord