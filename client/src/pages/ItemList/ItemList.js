import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ItemList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [casesItems, setCasesItems] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const getItems = async () => {
    const response = await axios.get("/api/items");
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
  const user_id = localStorage.getItem("user_id");

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/api/users/${user_id}`);

      setUserRole(response.data.data.user_type);
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
    const searchTerm = e.target.value;

    if (searchTerm === "") {
      // If search bar is empty, fetch all items
      getItems();
      setSearch("");
    } else {
      // Filter items by name
      const filteredItems = items.filter((item) =>
        item.name.includes(searchTerm)
      );
      setItems(filteredItems);
      setSearch(searchTerm);
    }
  };
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="mt-5 mt-md-0">
      <h2>Item's Scanned </h2>
      {userRole === "admin" && (
        <button className="update_btn" onClick={() => navigate("/editItems")}>
          Edit Stock
        </button>
      )}

      <div style={{ margin: 20 }} className="search_bar">
        <input
          value={search}
          onChange={handleSearch}
          type="text"
          placeholder="Search..."
        />
      </div>

      <div>
        <h1>Items without cases</h1>
        <Table
          bordered
          striped
          align="center"
          style={{ marginTop: "50px" }}
          width="60%"
          border="1"
        >
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
        </Table>

        <h1>Items with cases</h1>

        <Table
          bordered
          striped
          align="center"
          style={{ marginTop: "50px" }}
          width="60%"
          border="1"
        >
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Item Name</th>
              <th>Available Cases</th>
              <th>Available Boxes</th>
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
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ItemList;
