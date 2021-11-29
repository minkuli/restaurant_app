import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import ProfileForm from "./components/Profile/ProfileForm";
import AuthPage from "./pages/AuthPage";
import Notification from "./components/Profile/Notification";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/auth">
          <AuthPage />
        </Route>

        <Route path="/dashboard/" exact>
          <ProfileForm />
        </Route>

        <Route path="/notifications" exact>
          <Notification />
        </Route>

        <Route path="*">
          <Redirect to="/auth" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
