import { Route, Switch, Redirect } from "react-router-dom";
import Menu from "./pages/Menu";
import Order from "./pages/Order";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/menu" />
      </Route>
      <Route path="/menu">
        <Menu />
      </Route>
      <Route to="/order-summary">
        <Order />
      </Route>
    </Switch>
  );
}

export default App;
