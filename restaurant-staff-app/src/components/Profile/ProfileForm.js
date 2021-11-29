import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../UI/Card";
import classes from "./ProfileForm.module.css";
import { updateOrderStatus } from "../../store/order-actions";
import { updateNotification } from "../../store/staff-actions.js";
import { useHistory } from "react-router-dom";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [orderedItems, setOrderedItems] = useState([]);
  const [price, setPrice] = useState(0);
  const [orderId, setOrderId] = useState(0);
  const role = useSelector((state) => state.staff.role);

  const [foodPrepCheck, setFoodPrepCheck] = useState(false);
  const [drinkPrepCheck, setDrinkPrepCheck] = useState(false);
  const [person, setPerson] = useState(null);

  useEffect(() => {
    const fetchPerson = async () => {
      const response = await fetch("/staff/");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();
      const person = responseData.slice(-1)[0];
      setPerson(person);
    };

    fetchPerson()
      .then()
      .catch((err) => console.log(err));
  }, []);

  const handleFoodPrep = () => {
    if (!foodPrepCheck) {
      setFoodPrepCheck(true);
      dispatch(
        updateNotification(`Preparing food for order ${orderId}`, person.id)
      );
    }
    if (foodPrepCheck) {
      setFoodPrepCheck(false);
      dispatch(
        updateNotification(`Food Prepared for order ${orderId}`, person.id)
      );
    }
  };

  const handleDrinkPrep = () => {
    if (!drinkPrepCheck) {
      setDrinkPrepCheck(true);
      dispatch(
        updateNotification(`Preparing drink for order ${orderId}`, person.id)
      );
    }
    if (drinkPrepCheck) {
      setDrinkPrepCheck(false);
      dispatch(
        updateNotification(`Drink prepared for order ${orderId}`, person.id)
      );
    }
  };

  const handleDeliver = () => {
    dispatch(updateOrderStatus(orderId));
    alert(`Order ${orderId} has been delivered.`);
    history.replace("/auth");
  };

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
          category: lastOrder.order_items[i].category,
        });
      }
      setOrderedItems(loadedItems);
      setPrice(lastOrder.price);
    };

    fetchOrderedItems()
      .then()
      .catch((err) => console.log(err));
  }, []);

  const meals = orderedItems.filter((item) => item.category === "Food");
  const drinks = orderedItems.filter((item) => item.category === "Drink");

  const foodList = meals.map((item) => {
    return (
      <li className={classes.item} key={item.id}>
        <div>
          <span className={classes.name}>{item.name}</span>
          <span className={classes.quantity}>x {item.quantity}</span>
        </div>
      </li>
    );
  });

  const drinkList = drinks.map((item) => {
    return (
      <li className={classes.item} key={item.id}>
        <div>
          <span className={classes.name}>{item.name}</span>
          <span className={classes.quantity}>x {item.quantity}</span>
        </div>
      </li>
    );
  });

  const waiterDashboard = (
    <div className={classes.background}>
      <div className={classes.order}>
        <Card>
          {foodList.length !== 0 && (
            <div>
              <h3>Food</h3>
              <ul>{foodList}</ul>
            </div>
          )}
          {drinkList.length !== 0 && (
            <div>
              <h3>Drinks</h3>
              <ul>{drinkList}</ul>
            </div>
          )}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>$ {price}</span>
          </div>
          <button className={classes.form} onClick={handleDeliver}>
            Deliver
          </button>
        </Card>
      </div>
    </div>
  );

  const barmanDashboard = (
    <div className={classes.background}>
      <div className={classes.order}>
        {drinkList.length !== 0 && (
          <Card>
            <div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={drinkPrepCheck}
                    onChange={handleDrinkPrep}
                  />
                  Drinks
                </label>
              </div>
              <ul>{drinkList}</ul>
            </div>
          </Card>
        )}
      </div>
    </div>
  );

  const chefDashboard = (
    <div className={classes.background}>
      <div className={classes.order}>
        {foodList.length !== 0 && (
          <Card>
            <div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={foodPrepCheck}
                    onChange={handleFoodPrep}
                  />
                  Food
                </label>
              </div>
              <ul>{foodList}</ul>
            </div>
          </Card>
        )}
      </div>
    </div>
  );

  return (
    <section className={classes.profile}>
      <h1>Order #{orderId}</h1>
      {role === "Barman" && barmanDashboard}
      {role === "Waiter" && waiterDashboard}
      {role === "Chef" && chefDashboard}
    </section>
  );
};

export default OrderSummary;
