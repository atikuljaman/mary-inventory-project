import React, { useEffect, useState } from "react";
import { BsBoxSeamFill } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2"; // Import SweetAlert2
import "./EditItem.css";

const EditItem = () => {
  const [updateForm, setUpdateForm] = useState(false);
  const [updatedCases, setUpdatedCases] = useState(0);
  const [updatedBoxes, setUpdatedBoxes] = useState(0);
  const [itemName, setItemName] = useState("");
  const [cases, setCases] = useState(false);
  const [itemPrice, setItemPrice] = useState("");
  const [itemid, setItemId] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [loading, setLoading] = useState(true);

  const getItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/items");
      setItems(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching items:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleUpdate = async (id, item) => {
    setSelectedItem(item);
    setUpdateForm(true);
    setItemId(id);

    try {
      const { data } = await axios.get(`http://localhost:5000/api/items/${id}`);

      setItemName(data?.data?.name);
      setItemPrice(data?.data?.totalItems || data?.data?.cases || "");
      setCases(!!data?.data?.cases);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        name: itemName,
        id: itemid,
        ...(cases
          ? {
              cases: updatedCases || selectedItem.cases,
              boxes: updatedBoxes || selectedItem.boxes,
            }
          : { totalItems: itemPrice }),
      };
      await axios.post(`http://localhost:5000/api/items/edit`, updateData);
      setUpdateForm(false);
      // Show success message using SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Updated Successfully",
      });
      getItems(); // Refresh the items list
    } catch (error) {
      console.error("Error updating item:", error);
      // Show error message using SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message,
      });
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1 className="sec-title">Edit Items</h1>

      <div className="edit-items-container">
        {items.map((item) => (
          <div key={item._id} className="item_card">
            <div className="item-icon-container">
              <BsBoxSeamFill />
            </div>

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
                onClick={() => handleUpdate(item._id, item)}
                className="update_btn"
              >
                <FaPencilAlt className="icon" />
                Update
              </button>
            </div>
          </div>
        ))}

        <Modal show={updateForm} onHide={() => setUpdateForm(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title className="modal-title">Update Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleFormSubmit} className="form_update">
              <div className="input-box">
                <label htmlFor="name">Name</label>
                <input
                  readOnly
                  value={itemName}
                  className="login-input"
                  type="text"
                  name="name"
                />
              </div>

              {cases ? (
                <>
                  <div className="input-box">
                    <label htmlFor="cases">Cases</label>
                    <input
                      onChange={(e) => setUpdatedCases(e.target.value)}
                      value={updatedCases || selectedItem.cases}
                      className="login-input"
                      type="number"
                      name="cases"
                    />
                  </div>

                  <div className="input-box">
                    <label htmlFor="boxes">Boxes</label>
                    <input
                      onChange={(e) => setUpdatedBoxes(e.target.value)}
                      value={updatedBoxes || selectedItem.boxes}
                      className="login-input"
                      type="number"
                      name="boxes"
                    />
                  </div>
                </>
              ) : (
                <>
                  <label htmlFor="totalItems">Available Amount</label>
                  <input
                    onChange={(e) => setItemPrice(e.target.value)}
                    value={itemPrice}
                    className="login-input"
                    type="number"
                    name="totalItems"
                  />
                </>
              )}
              <div className="btn-container">
                <Button variant="success" type="submit">
                  Confirm
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setUpdateForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default EditItem;
