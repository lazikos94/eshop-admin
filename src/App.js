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
import Orders from "./pages/orders/Orders";
import Users from "./pages/users/Users";
import Invoices from "./pages/invoices/Invoices";
import EditOrder from "./pages/orders/EditOrder";
import EditInvoice from "./pages/invoices/EditInvoice";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  const { globalState } = useMain();

  return (
    <div className="container">
      <Header pages={[
        { name: 'View Products', path: '/admin/products', type: 'start' },
        { name: "New Product", path: '/admin/new-product', type: 'start' },
        {
          name: 'View Attributes', paths: [
            { path: '/admin/view-attributes/category', name: 'Category' },
            { path: '/admin/view-attributes/subcategory', name: 'Subcategory' },
            { path: '/admin/view-attributes/brand', name: 'Brand' },
            { path: '/admin/view-attributes/size', name: 'Size' },
            { path: '/admin/view-attributes/color', name: 'Color' },
          ], type: 'dropdown'
        },
        {
          name: 'New Attributes', type: 'dropdown', paths: [
            { path: '/admin/new-attributes/category', name: 'Category' },
            { path: '/admin/new-attributes/subcategory', name: 'Subcategory' },
            { path: '/admin/new-attributes/brand', name: 'Brand' },
            { path: '/admin/new-attributes/size', name: 'Size' },
            { path: '/admin/new-attributes/color', name: 'Color' },
          ]
        },
        {
          name: 'Order Data', type: 'dropdown', paths: [
            { path: '/admin/orders', name: 'Orders' },
            { path: '/admin/invoices', name: 'Invoices' },
            { path: '/admin/customers', name: 'Customers' }
          ]
        },
        { name: 'Pages', path: '/view-pages', type: 'start' },
      ]}
        auth={globalState} />
      <Routes>
        <Route path={"/admin"} element={<Dashboard/>}/>
        <Route path={"/admin/products"} element={<Products />} />
        <Route path={"/admin/product/:id"} element={<Product />} />
        <Route path={"/admin/view-pages"} element={<ViewPages />} />
        <Route path={"/admin/edit-product/:id"} element={<EditProduct />} />
        <Route path={"/admin/new-product"} element={<NewProduct />} />
        <Route path={"/admin/new-attributes/category"} element={<NewCategory />} />
        <Route path={"/admin/new-attributes/subcategory"} element={<NewSubcategory />} />
        <Route path={"/admin/new-attributes/brand"} element={<NewBrand />} />
        <Route path={"/admin/new-attributes/size"} element={<NewSize />} />
        <Route path={"/admin/new-attributes/color"} element={<NewColor />} />
        <Route path={"/admin/view-attributes/category"} element={<ViewCategory />} />
        <Route path={"/admin/view-attributes/subcategory"} element={<ViewSubcategory />} />
        <Route path={"/admin/view-attributes/brand"} element={<ViewBrand />} />
        <Route path={"/admin/view-attributes/size"} element={<ViewSize />} />
        <Route path={"/admin/view-attributes/color"} element={<ViewColor />} />
        <Route path={"/admin/edit-attributes/category/:id"} element={<EditCategory />} />
        <Route path={"/admin/edit-attributes/subcategory/:id"} element={<EditSubcategory />} />
        <Route path={"/admin/edit-attributes/brand/:id"} element={<EditBrand />} />
        <Route path={"/admin/edit-attributes/size/:id"} element={<EditSize />} />
        <Route path={"/admin/edit-attributes/color/:id"} element={<EditColor />} />
        <Route path={"/admin/edit-page/:id"} element={<EditPage />} />
        <Route path={'/admin/orders'} element={<Orders />} />
        <Route path={'/admin/edit-orders/:id'} element={<EditOrder/>} />
        <Route path={'/admin/edit-invoices/:id'} element={<EditInvoice/>} />
        <Route path={'/admin/invoices'} element={<Invoices />} />
        <Route path={'/admin/customers'} element={<Users />} />
        <Route path={"/admin/login"} element={<Login />} />
        <Route path={"/admin/register"} element={<Register />} />
        <Route path={"/admin/*"} element={<div>Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
