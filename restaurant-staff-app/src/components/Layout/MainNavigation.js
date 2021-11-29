import { useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { staffActions } from "../../store/staff";

const MainNavigation = () => {
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.staff.isLoggedIn);
  const role = useSelector((state) => state.staff.role);
  const dispatch = useDispatch();

  const logoutHandler = useCallback(() => {
    dispatch(staffActions.logout());
    history.replace("/auth");
  }, [dispatch, history]);

  useEffect(() => {
    logoutHandler();
  }, [logoutHandler]);

  return (
    <header className={classes.header}>
      {!isLoggedIn && (
        <Link to="/">
          <div className={classes.logo}>Staff</div>
        </Link>
      )}
      {isLoggedIn && <div className={classes.logo}>{role}</div>}
      <nav>
        <ul>
          {isLoggedIn && (
            <li>
              <Link to="/dashboard">
                <div>Dashboard</div>
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/notifications">
                <div>Notifications</div>
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
