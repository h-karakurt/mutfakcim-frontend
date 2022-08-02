import "./assets/style/App.css";
import Login from "./pages/auth/login.js";
import Register from "./pages/auth/register";
import Inventory from "./pages/app/inventory";
import Shop from "./pages/app/shop";
import Recipes from "./pages/app/recipes";
import Stats from "./pages/app/stats";
import Options from "./pages/app/options"

import "../src/assets/style/custom.scss";

import { BrowserRouter, Routes, Route} from "react-router-dom";

// https://arcane-fortress-37188.herokuapp.com/api

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="" element={<Login />} />
          <Route exact path="/auth/register" element={<Register />} />
          
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
