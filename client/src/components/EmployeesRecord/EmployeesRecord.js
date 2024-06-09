import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import "./EmployeesRecord.css";
import axios from "axios";
import EmployeeTable from "./EmployeeTable";
import { Button, Table } from "react-bootstrap";

const EmployeesRecord = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const getAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/users");
      //   setUsers(res.data.data);
      const filteredUsers = res.data.filter(
        (user) => user.user_type !== "admin"
      );
      setUsers(filteredUsers);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;

    if (searchTerm === "") {
      // If search bar is empty, fetch all items
      getAllUsers();
      setSearch("");
    } else {
      // Filter items by name
      const filteredItems = users.filter((item) =>
        item.firstName.includes(searchTerm)
      );
      setUsers(filteredItems);
      setSearch(searchTerm);
    }
  };

  const handleClear = async () => {
    try {
      setLoading(true);
      await axios.get("http://localhost:5000/api/items/clear");
      alert("Data Successfully Cleared");
      setLoading(false);
      getAllUsers();
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="">
      <h1 className="sec-title">Employees Record</h1>

      <div className="search-bar-container">
        <div className="search_bar">
          <IoSearch className="search_icon" />
          <input
            value={search}
            onChange={handleSearch}
            type="text"
            placeholder="Search..."
          />
        </div>
        <button onClick={handleClear} className="clear-btn">
          <FaTrashAlt /> Clear All
        </button>
      </div>

      <div className="employees-table-container">
        <table>
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Employee Name</th>
              <th>Total Scanned Items</th>
              <th>Item Names</th>
              <th>Scan Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td>Loading...</td>
              </tr>
            ) : (
              users.map((item, index) => (
                <EmployeeTable
                  lastScan={item.lastScan}
                  index={index + 1}
                  name={item.firstName + " " + item.lastName}
                  key={item._id}
                  scannedItems={item.scannedItems}
                  id={item._id}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesRecord;
