import classes from "./OrderedItem.module.css";
const OrderedItem = (props) => {
  return (
    <li className={classes.item}>
      <div>
        <span className={classes.name}>{props.name}</span>
        <span className={classes.quantity}>x {props.quantity}</span>
      </div>
    </li>
  );
};

export default OrderedItem;
