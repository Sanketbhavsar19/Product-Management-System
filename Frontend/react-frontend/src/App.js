// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import CategoryList from './components/CategoryList';
// import ProductList from './components/ProductList';

// function App() {
//   return (
//     <Router>
//       <div>
//         {/* Navigation links */}
//         <nav>
//           <ul>
//             <li>
//               <Link to="/categories">Categories</Link>
//             </li>
//             <li>
//               <Link to="/products">Products</Link>
//             </li>
//           </ul>
//         </nav>

//         {/* Define Routes */}
//         <Routes>
//           <Route path="/categories" element={<CategoryList />} />
//           <Route path="/products" element={<ProductList />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


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
