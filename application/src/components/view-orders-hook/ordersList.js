import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SERVER_IP } from "../../private";

const DELETE_ORDER_URL = `${SERVER_IP}/api/delete-order`;
const EDIT_ORDER_URL = `${SERVER_IP}/api/edit-order`;

const OrdersList = (props) => {
  const { order, setRender } = props;

  const [edit, setEdit] = useState(false);
  const [orderItem, setOrderItem] = useState("");
  const [quantity, setQuantity] = useState("1");
  const auth = useSelector((state) => state.auth);

  const menuItemChosen = (event) => setOrderItem(event.target.value);
  const menuQuantityChosen = (event) => setQuantity(event.target.value);

  const deleteOrder = (id) => {
    fetch(DELETE_ORDER_URL, {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => console.log("Success", JSON.stringify(response)))
      .catch((error) => console.error(error));
    setRender(true);
  };

  const editOrder = (id) => {
    fetch(EDIT_ORDER_URL, {
      method: "POST",
      body: JSON.stringify({
        id: id,
        order_item: orderItem,
        quantity,
        ordered_by: auth.email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => console.log("Success", JSON.stringify(response)))
      .catch((error) => console.log(error));
    setRender(true);
    setEdit(false);
  };

  const editForm = (id) => {
    if (edit) {
      return (
        <form style={{ marginLeft: "1rem" }}>
          <label className="form-label">I'd like to order...</label>
          <br />
          <select
            value={orderItem}
            onChange={(event) => menuItemChosen(event)}
            className="menu-select"
          >
            <option value="" defaultValue disabled hidden>
              Lunch menu
            </option>
            <option value="Soup of the Day">Soup of the Day</option>
            <option value="Linguini With White Wine Sauce">Linguini With White Wine Sauce</option>
            <option value="Eggplant and Mushroom Panini">Eggplant and Mushroom Panini</option>
            <option value="Chili Con Carne">Chili Con Carne</option>
          </select>
          <br />
          <label className="qty-label">Qty:</label>
          <select value={quantity} onChange={(event) => menuQuantityChosen(event)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
          <button type="submit" className="order-btn" onClick={() => editOrder(id)}>
            Update Order!
          </button>
        </form>
      );
    } else return;
  };

  const createdDate = new Date(order.createdAt);
  return (
    <div className="row view-order-container" key={order._id}>
      <div className="col-md-4 view-order-left-col p-3">
        <h2>{order.order_item}</h2>
        <p>Ordered by: {order.ordered_by || ""}</p>
      </div>
      <div className="col-md-4 d-flex view-order-middle-col">
        <p>
          Order placed at{" "}
          {`${createdDate.getHours()}:${
            (createdDate.getMinutes() < 10 ? "0" : "") + createdDate.getMinutes()
          }:${(createdDate.getSeconds() < 10 ? "0" : "") + createdDate.getSeconds()}`}
        </p>
        <p>Quantity: {order.quantity}</p>
      </div>
      <div className="col-md-4 view-order-right-col">
        <button className="btn btn-success" onClick={() => setEdit(true)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => deleteOrder(order._id)}>
          Delete
        </button>
      </div>
      {editForm(order._id)}
    </div>
  );
};

// return orders.map((order) => {
//   const createdDate = new Date(order.createdAt);
//   return (
//     <div className="row view-order-container" key={order._id}>
//       <div className="col-md-4 view-order-left-col p-3">
//         <h2>{order.order_item}</h2>
//         <p>Ordered by: {order.ordered_by || ""}</p>
//       </div>
//       <div className="col-md-4 d-flex view-order-middle-col">
//         <p>
//           Order placed at{" "}
//           {`${createdDate.getHours()}:${
//             (createdDate.getMinutes() < 10 ? "0" : "") + createdDate.getMinutes()
//           }:${(createdDate.getSeconds() < 10 ? "0" : "") + createdDate.getSeconds()}`}
//         </p>
//         <p>Quantity: {order.quantity}</p>
//       </div>
//       <div className="col-md-4 view-order-right-col">
//         <button className="btn btn-success" onClick={() => editOrder(order._id)}>
//           Edit
//         </button>
//         <button className="btn btn-danger" onClick={() => deleteOrder(order._id)}>
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// });

export default OrdersList;
