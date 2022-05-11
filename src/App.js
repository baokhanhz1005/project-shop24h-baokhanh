import { Route, Routes } from "react-router-dom";
import ProductList from "./pages/ProductList";

import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import ProductInfo from "./pages/ProductInfo";
import Order from "./pages/Order";



function App() {
  return (
  
        <Routes>
          <Route exact path="/" element={ <Home/> }></Route>
          <Route path="/products" element={<ProductList/>}></Route>
          <Route path="/dang-nhap" element={<LoginForm/>}></Route>
          <Route path="/products/:param" element={<ProductInfo/>}></Route>
          <Route path="/order" element={ <Order/> }></Route>
        </Routes>

  
  );
}

export default App;
