import React, { useState, useEffect } from "react";
import { Template } from "../../components";
import { SERVER_IP } from "../../private";
import OrdersList from "./ordersList";
import "./viewOrders.css";

export default function ViewOrders(props) {
  const [orders, setOrders] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    fetch(`${SERVER_IP}/api/current-orders`)
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setOrders(response.orders);
        } else {
          console.log("Error getting orders");
        }
      });
    setRender(false);
  }, [render]);

  return (
    <Template>
      {orders.length === 0 ? (
        <div className="container-fluid">
          <h2>There are no orders to display.</h2>
        </div>
      ) : (
        <div className="container-fluid">
          {orders.map((order) => (
            <OrdersList key={order._id} order={order} setRender={setRender} />
          ))}
        </div>
      )}
    </Template>
  );
}
