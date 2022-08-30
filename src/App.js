import "./assets/style/App.css";
import Login from "./pages/auth/login.js";
import Register from "./pages/auth/register";
import Confirm from "./pages/auth/confirm";
import ForgetPassword from "./pages/auth/forgetPassword";
import ForgetPasswordComfirm from "./pages/auth/resetConfirm";
import ForgetPasswordRedirect from "./pages/auth/forgetPassword-redirect";
import Inventory from "./pages/app/inventory";
import Shop from "./pages/app/shop";
import Recipes from "./pages/app/recipes";
import Stats from "./pages/app/stats";
import Landing from "./pages/Landing";
import Options from "./pages/app/options"

import "../src/assets/style/custom.scss";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// http://localhost:3051/api

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="" element={<Landing />} />
          <Route exact path="/auth/login" element={<Login />} />
          <Route exact path="/auth/register" element={<Register />} />
          <Route exact path="/auth/confirm" element={<Confirm />} />
          <Route
            exact
            path="/auth/forgetpassword"
            element={<ForgetPassword />}
          />
          <Route
            exact
            path="/auth/forgetpassword/confirm"
            element={<ForgetPasswordComfirm />}
          />
          <Route
            exact
            path="/auth/forgetpassword/redirect"
            element={<ForgetPasswordRedirect />}
          />
          <Route exact path="/shop" element={<Shop />} />
          <Route exact path="/inventory" element={<Inventory />} />
          <Route exact path="/recipes" element={<Recipes />} />
          <Route exact path="/stats" element={<Stats />} />
          <Route exact path="/options" element={<Options />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
