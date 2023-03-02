import { Routes, Route } from "react-router-dom";
import useMain from './context/main';
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Product from "./pages/products/Product";
import Products from './pages/products/Products';
import Header from "./components/Header";
import NewProduct from "./pages/products/NewProduct";
import Options from "./pages/products/Options";

function App() {
  const {globalState} = useMain();

  return (
    <div className="container">
    <Header pages={[{name:'Products',path:'/',type:'start'},{name:'Options',path:'/options',type:'start'},{name:"New Product",path:'/new-product',type:'start'}]} auth={globalState} />
    <Routes>
      <Route path={"/"} element={<Products/>}/>
      <Route path={"product/:id"} element={<Product/>}/>
      <Route path={"new-product"} element={<NewProduct/>}/>
      <Route path={"options"} element={<Options/>}/>
      <Route path={"login"} element={<Login/>}/>
      <Route path={"register"} element={<Register/>}/>
      <Route path={"/*"} element={<div>Not Found</div>}/>
    </Routes>
    </div>
  );
}

export default App;
