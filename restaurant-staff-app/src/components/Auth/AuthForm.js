import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { staffActions } from "../../store/staff";
import { login } from "../../store/staff-actions";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const nameInputRef = useRef();
  const roleInputRef = useRef();
  const user = useSelector((state) => state.staff);
  const dispatch = useDispatch();

  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredRole = roleInputRef.current.value;

    dispatch(
      staffActions.login({
        name: enteredName,
        role: enteredRole,
      })
    );
    dispatch(login(enteredName, enteredRole));
    history.replace("/dashboard");
  };

  console.log("user ", user);
  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" required ref={nameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="role">Your Role</label>
          <input type="text" id="role" required ref={roleInputRef} />
        </div>
        <div className={classes.actions}>
          <button>Login</button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
