import axios from "axios";
import React, { useEffect, useState } from "react";
import "./EditItem.css";
const EditItem = () => {
  const [updateForm, setUpdateForm] = useState(false);
  const [updatedCases, setUpdatedCases] = useState(0);
  const [updatedBoxes, setUpdatedBoxes] = useState(0);
  const [itemName, setItemName] = useState("");
  const [cases, setCases] = useState(false); // [1
  const [itemPrice, setItemPrice] = useState("");
  const [itemid, setItemId] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({}); // [1
  const [loading, setLoading] = useState(true);
  const getItems = async () => {
    const response = await axios.get("/api/items");
    setItems(response.data.data);
    setLoading(false);
  };

  useEffect(() => {
    getItems();
  });
  const handleUpdate = async (id, item) => {
    setSelectedItem(item); // [1
    setUpdateForm(!updateForm);
    setItemId(id);
    try {
      const data = await axios.get(`/api/items/${id}`);
      setItemName(data.data.data.name);
      setItemPrice(
        data.data.data.totalItems
          ? data.data.data.totalItems
          : data.data.data.cases
      );
      setCases(data.data.data.cases ? true : false);
    } catch (error) {}
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedItem.cases) {
        await axios.post(`/api/items/edit`, {
          name: itemName,
          id: itemid,
          cases: updatedBoxes,
          boxes: updatedCases,
        });
      } else {
        await axios.post(`/api/items/edit`, {
          name: itemName,
          id: itemid,
          totalItems: itemPrice,
        });
      }

      setUpdateForm(!updateForm);
      alert("Updated Successfully");
    } catch (error) {
      setUpdateForm(!updateForm);
      alert("Update Failed");
    }
  };
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="item_main">
      <h1>Edit Items</h1>

      {items.map((item) => {
        return (
          <div key={item._id} className="item_card">
            <div className="item_head">
              <h3>{item.name}</h3>
              {item.cases ? (
                <>
                  <h6>Available Cases : {item.cases}</h6>
                  <h6>Available Boxes : {item.boxes}</h6>
                </>
              ) : (
                <h6>Available Items : {item.items_left}</h6>
              )}
            </div>
            <div className="item_foot">
              <button
                onClick={() => {
                  handleUpdate(item._id, item);
                }}
                className="update_btn"
              >
                Update
              </button>
            </div>
          </div>
        );
      })}
      {updateForm && (
        <form onSubmit={handleFormSubmit} className="form_update">
          <h2>Update Data</h2>
          <label htmlFor="">Name</label>
          <input
            readOnly
            value={itemName}
            className="login-input"
            type="text"
            name="name"
          />

          {
            // [2
            cases ? (
              <>
                <label htmlFor="">Cases</label>
                <input
                  onChange={(e) => setUpdatedCases(e.target.value)}
                  value={updatedCases ? updatedCases : selectedItem.cases}
                  className="login-input"
                  type="number"
                  name="cases"
                />
                <label htmlFor="">Boxes</label>
                <input
                  value={updatedBoxes ? updatedBoxes : selectedItem.boxes}
                  onChange={(e) => setUpdatedBoxes(e.target.value)}
                  className="login-input"
                  type="number"
                  name="cases"
                />
              </>
            ) : (
              <>
                <label htmlFor="">Available Amount</label>
                <input
                  value={itemPrice}
                  onChange={(e) => setItemPrice(e.target.value)}
                  className="login-input"
                  type="number"
                  name="totalItems"
                />
              </>
            )
          }
          <button className="submit_btn" type="submit">
            Update
          </button>
          <button
            onClick={() => setUpdateForm(!updateForm)}
            className="update_btn"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default EditItem;
