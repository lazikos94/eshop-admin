import { Routes, Route } from "react-router-dom";
import useMain from './context/main';
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Product from "./pages/products/Product";
import Products from './pages/products/Products';
import Header from "./components/Header";
import NewProduct from "./pages/products/NewProduct";
import NewCategory from "./pages/options/NewCategory";
import ViewOptions from "./pages/options/ViewOptions";
import NewSubcategory from "./pages/options/NewSubcategory";
import NewBrand from "./pages/options/NewBrand";
import NewSize from "./pages/options/NewSize";
import NewColor from "./pages/options/NewColor";
import EditOptions from "./pages/options/EditOptions";

function App() {
  const {globalState} = useMain();

  return (
    <div className="container">
    <Header pages={[
      {name:'Products',path:'/',type:'start'},
      {name:'New Option',type:'dropdown',paths:[
          {path:'/new-option/category',name:'Category'},
          {path:'/new-option/subcategory',name:'Subcategory'},
          {path:'/new-option/brand',name:'Brand'},
          {path:'/new-option/size',name:'Size'},
          {path:'/new-option/color',name:'Color'},
      ]},
      {name:'View Options',path:'/view-options',type:'start'},
      {name:'Edit Options',path:'/edit-options',type:'start'},
      {name:"New Product",path:'/new-product',type:'start'},
      {name:'Orders',path:'/orders',type:'start'}]} 
    auth={globalState} />
    <Routes>
      <Route path={"/"} element={<Products/>}/>
      <Route path={"product/:id"} element={<Product/>}/>
      <Route path={"new-product"} element={<NewProduct/>}/>
      <Route path={"new-option/category"} element={<NewCategory/>}/>
      <Route path={"new-option/subcategory"} element={<NewSubcategory/>}/>
      <Route path={"new-option/brand"} element={<NewBrand/>}/>
      <Route path={"new-option/size"} element={<NewSize/>}/>
      <Route path={"new-option/color"} element={<NewColor/>}/>
      <Route path={"view-options"} element={<ViewOptions/>}/>
      <Route path={"edit-options"} element={<EditOptions/>}/>
      <Route path={"login"} element={<Login/>}/>
      <Route path={"register"} element={<Register/>}/>
      <Route path={"/*"} element={<div>Not Found</div>}/>
    </Routes>
    </div>
  );
}

export default App;
