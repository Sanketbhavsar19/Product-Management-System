
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CategoryList from "./components/CategoryList";
import ProductList from "./components/ProductList";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/categorylist" element={<CategoryList />} />
        <Route path="/productlist" element={<ProductList />} />
      </Routes>
    </Router>
  );
};

export default App;
