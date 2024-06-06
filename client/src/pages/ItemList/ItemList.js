import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import "./ItemList.css";

const ItemList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [casesItems, setCasesItems] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const getItems = async () => {
    const response = await axios.get("http://localhost:5000/api/items");
    document.body.style.overflowX = "hidden";

    setCasesItems(
      response.data.data.filter((item) => {
        return item.cases;
      })
    );

    setItems(
      response.data.data.filter((item) => {
        return !item.cases;
      })
    );
    setLoading(false);
  };

  const user = JSON.parse(localStorage.getItem("User"));

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/find/${user?._id}`
      );

      setUserRole(response.data.user_type);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getItems();

    // Fetch user data and set the user role and profile pic

    fetchUserData();
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    if (searchTerm === "") {
      // If search bar is empty, fetch all items
      getItems();
      setSearch("");
    } else {
      // Filter items by name
      const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      );

      setItems(filteredItems);
      setSearch(searchTerm);
    }
  };

  // console.log(items);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="">
      <h2 className="sec-title">Item's Scanned </h2>

      <div className="item-list-header">
        <div className="search_bar">
          <IoSearch className="search_icon" />
          <input
            value={search}
            onChange={handleSearch}
            type="text"
            placeholder="Search..."
          />
        </div>

        {userRole === "admin" && (
          <button className="edit_btn" onClick={() => navigate("/editItems")}>
            <FaEdit /> Edit Stock
          </button>
        )}
      </div>

      <div className="item-list-container">
        <div className="item-list-table-wrapper">
          <h2>Items without cases</h2>

          <div className="item-list-table-container">
            <table>
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Item Name</th>
                  <th>Available Items</th>
                  <th>Total Items</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item._id}>
                    <td align="center">{index + 1}</td>
                    <td align="center">{item.name}</td>
                    {item.items_left === 0 ? (
                      <td style={{ backgroundColor: "red" }} align="center">
                        {" "}
                        {item.items_left}
                      </td>
                    ) : item.items_left < 5 ? (
                      <td style={{ backgroundColor: "yellow" }} align="center">
                        {" "}
                        {item.items_left}
                      </td>
                    ) : (
                      <td align="center"> {item.items_left}</td>
                    )}
                    <td align="center"> {item.totalItems}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="item-list-table-wrapper">
          <h2>Items with cases</h2>

          <div className="item-list-table-container item-list-table-container-2">
            <table>
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Item Name</th>
                  <th>Available Cases</th>
                  <th>Available Boxes</th>
                  <th>Available Items</th>
                </tr>
              </thead>
              <tbody>
                {casesItems.map((item, index) => (
                  <tr key={item._id}>
                    <td align="center">{index + 1}</td>
                    <td align="center">{item.name}</td>
                    {item.items_left === 0 ? (
                      <td style={{ backgroundColor: "red" }} align="center">
                        {" "}
                        {item.cases}
                      </td>
                    ) : item.cases < 5 ? (
                      <td style={{ backgroundColor: "yellow" }} align="center">
                        {" "}
                        {item.cases}
                      </td>
                    ) : (
                      <td align="center"> {item.cases}</td>
                    )}
                    <td align="center"> {item.boxes}</td>
                    <td align="center"> {item.items_left}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
