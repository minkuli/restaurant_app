import { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../UI/Card";
import OrderedItem from "./OrderedItem";
import classes from "./OrderSummary.module.css";

const OrderSummary = () => {
  const [orderedItems, setOrderedItems] = useState([]);
  const [price, setPrice] = useState(0);
  const [orderId, setOrderId] = useState(0);
  const [orderStatus, setOrderStatus] = useState("pending");
  const history = useHistory();

  useEffect(() => {
    const fetchOrderedItems = async () => {
      const response = await fetch("/order/");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();
      const lastOrder = responseData.slice(-1)[0];

      setOrderId(lastOrder.id);
      const loadedItems = [];
      for (let i in lastOrder.order_items) {
        loadedItems.push({
          id: i,
          name: lastOrder.order_items[i].name,
          quantity: lastOrder.order_items[i].quantity,
        });
      }
      setOrderedItems(loadedItems);
      setPrice(lastOrder.price);
      setOrderStatus(lastOrder.status);
    };

    fetchOrderedItems()
      .then()
      .catch((err) => console.log(err));
  }, [orderId, orderStatus]);

  const orderList = orderedItems.map((item) => {
    return (
      <OrderedItem key={item.id} name={item.name} quantity={item.quantity} />
    );
  });

  return (
    <Fragment>
      <div className={classes.background}>
        <div className={classes.order}>
          <Card>
            <h1>Here is the summary of your order #{orderId}</h1>
            <ul>{orderList}</ul>
            <div className={classes.total}>
              <span>Total Amount</span>
              <span>$ {price}</span>
            </div>
          </Card>
          <button
            onClick={() => history.replace("/")}
            className={classes.button}
          >
            Go to menu
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderSummary;
