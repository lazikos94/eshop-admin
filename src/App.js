import { Routes, Route } from "react-router-dom";
import useMain from './context/main';
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Product from "./pages/products/Product";
import Products from './pages/products/Products';
import Header from "./components/Header";
import NewProduct from "./pages/products/NewProduct";
import NewCategory from "./pages/attributes/new/NewCategory";
import NewSubcategory from "./pages/attributes/new/NewSubcategory";
import NewBrand from "./pages/attributes/new/NewBrand";
import NewSize from "./pages/attributes/new/NewSize";
import NewColor from "./pages/attributes/new/NewColor";

import ViewCategory from "./pages/attributes/view/ViewCategory";
import ViewSubcategory from "./pages/attributes/view/ViewSubcategory";
import ViewBrand from "./pages/attributes/view/ViewBrand";
import ViewSize from "./pages/attributes/view/ViewSize";
import ViewColor from "./pages/attributes/view/ViewColor";
import EditCategory from "./pages/attributes/edit/EditCategory";
import EditSubcategory from "./pages/attributes/edit/EditSubcategory";
import EditBrand from "./pages/attributes/edit/EditBrand";
import EditSize from "./pages/attributes/edit/EditSize";
import EditColor from "./pages/attributes/edit/EditColor";
import EditProduct from "./pages/products/EditProduct";
import ViewPages from "./pages/attributes/view/ViewPages";
import EditPage from "./pages/attributes/edit/EditPage";

function App() {
  const { globalState } = useMain();

  return (
    <div className="container">
      <Header pages={[
        { name: 'View Products', path: '/', type: 'start' },
        { name: "New Product", path: '/new-product', type: 'start' },
        {
          name: 'View Attributes', paths: [
            { path: '/view-attributes/category', name: 'Category' },
            { path: '/view-attributes/subcategory', name: 'Subcategory' },
            { path: '/view-attributes/brand', name: 'Brand' },
            { path: '/view-attributes/size', name: 'Size' },
            { path: '/view-attributes/color', name: 'Color' },
          ], type: 'dropdown'
        },
        {
          name: 'New Attributes', type: 'dropdown', paths: [
            { path: '/new-attributes/category', name: 'Category' },
            { path: '/new-attributes/subcategory', name: 'Subcategory' },
            { path: '/new-attributes/brand', name: 'Brand' },
            { path: '/new-attributes/size', name: 'Size' },
            { path: '/new-attributes/color', name: 'Color' },
          ]
        },

        // { name: 'Edit Attributes', paths: [ 
        //   { path:'/edit-attributes/category', name: 'Category' },
        // ], type: 'dropdown' },

        { name: 'Pages', path: '/view-pages', type: 'start' },
        { name: 'Orders', path: '/orders', type: 'start' }]}
        auth={globalState} />
      <Routes>
        <Route path={"/"} element={<Products />} />
        <Route path={"product/:id"} element={<Product />} />
        <Route path={"view-pages"} element={<ViewPages />} />
        <Route path={"edit-product/:id"} element={<EditProduct />} />
        <Route path={"new-product"} element={<NewProduct />} />
        <Route path={"new-attributes/category"} element={<NewCategory />} />
        <Route path={"new-attributes/subcategory"} element={<NewSubcategory />} />
        <Route path={"new-attributes/brand"} element={<NewBrand />} />
        <Route path={"new-attributes/size"} element={<NewSize />} />
        <Route path={"new-attributes/color"} element={<NewColor />} />
        <Route path={"view-attributes/category"} element={<ViewCategory />} />
        <Route path={"view-attributes/subcategory"} element={<ViewSubcategory />} />
        <Route path={"view-attributes/brand"} element={<ViewBrand />} />
        <Route path={"view-attributes/size"} element={<ViewSize />} />
        <Route path={"view-attributes/color"} element={<ViewColor />} />
        <Route path={"edit-attributes/category/:id"} element={<EditCategory />} />
        <Route path={"edit-attributes/subcategory/:id"} element={<EditSubcategory />} />
        <Route path={"edit-attributes/brand/:id"} element={<EditBrand />} />
        <Route path={"edit-attributes/size/:id"} element={<EditSize />} />
        <Route path={"edit-attributes/color/:id"} element={<EditColor />} />
        <Route path={"edit-page/:id"} element={<EditPage />} />
        <Route path={"login"} element={<Login />} />
        <Route path={"register"} element={<Register />} />
        <Route path={"/*"} element={<div>Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
