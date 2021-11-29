import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";

const Checkout = (props) => {
  const [tableInputsValidity, setTableInputsValidity] = useState(true);

  const tableNoInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredTable = tableNoInputRef.current.value;

    const enteredTableIsValid = !isEmpty(enteredTable);

    setTableInputsValidity(enteredTableIsValid);

    if (!enteredTableIsValid) {
      return;
    }

    props.onConfirm(enteredTable);
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          tableInputsValidity ? "" : classes.invalid
        }`}
      >
        <label htmlFor="table">Table number</label>
        <input type="number" id="table" ref={tableNoInputRef} />
        {!tableInputsValidity && <p>Please enter the table number</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
