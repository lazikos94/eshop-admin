import { Routes, Route } from "react-router-dom";
import useMain from './context/main';
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Product from "./pages/products/Product";
import Products from './pages/products/Products';
import Header from "./components/Header";
import NewProduct from "./pages/products/NewProduct";
import NewCategory from "./pages/attributes/NewCategory";
import ViewAttributes from "./pages/attributes/ViewAttributes";
import NewSubcategory from "./pages/attributes/NewSubcategory";
import NewBrand from "./pages/attributes/NewBrand";
import NewSize from "./pages/attributes/NewSize";
import NewColor from "./pages/attributes/NewColor";
import EditAttributes from "./pages/attributes/EditAttributes";

function App() {
  const {globalState} = useMain();

  return (
    <div className="container">
    <Header pages={[
      {name:'Products',path:'/',type:'start'},
      {name:'New Attributes',type:'dropdown',paths:[
          {path:'/new-attributes/category',name:'Category'},
          {path:'/new-attributes/subcategory',name:'Subcategory'},
          {path:'/new-attributes/brand',name:'Brand'},
          {path:'/new-attributes/size',name:'Size'},
          {path:'/new-attributes/color',name:'Color'},
      ]},
      {name:'View Attributes',path:'/view-attributes',type:'start'},
      {name:'Edit Attributes',path:'/edit-attributes',type:'start'},
      {name:"New Product",path:'/new-product',type:'start'},
      {name:'Orders',path:'/orders',type:'start'}]} 
    auth={globalState} />
    <Routes>
      <Route path={"/"} element={<Products/>}/>
      <Route path={"product/:id"} element={<Product/>}/>
      <Route path={"new-product"} element={<NewProduct/>}/>
      <Route path={"new-attributes/category"} element={<NewCategory/>}/>
      <Route path={"new-attributes/subcategory"} element={<NewSubcategory/>}/>
      <Route path={"new-attributes/brand"} element={<NewBrand/>}/>
      <Route path={"new-attributes/size"} element={<NewSize/>}/>
      <Route path={"new-attributes/color"} element={<NewColor/>}/>
      <Route path={"view-attributes"} element={<ViewAttributes/>}/>
      <Route path={"edit-attributes"} element={<EditAttributes/>}/>
      <Route path={"login"} element={<Login/>}/>
      <Route path={"register"} element={<Register/>}/>
      <Route path={"/*"} element={<div>Not Found</div>}/>
    </Routes>
    </div>
  );
}

export default App;
