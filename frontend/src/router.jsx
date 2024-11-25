import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/App.layout';
import Deletedlayout from './layouts/Deleted.layout';
import User from './layouts/User.loyout';
import { 
    CategoriesDeleteView, 
    CategoriesView, 
    DashboardView, 
    InventoryDeleteView, 
    InventoryView, 
    LoginView, 
    MovementsView, 
    ProductsDeleteView, 
    ProductsView, 
    RegisterView, 
    SupplierDeletedView, 
    SuppliersView, 
    WarehouseDeleteView, 
    WarehouseView } from './views';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path="/categorias" element={<CategoriesView />} />
          <Route path="/productos" element={<ProductsView />} />
          <Route path="/bodegas" element={<WarehouseView />} />
          <Route path="/inventario" element={<InventoryView />} /> 
          <Route path="/proveedores" element={<SuppliersView />} /> 
          <Route path="/movimientos" element={<MovementsView />} />

          <Route path='/del' element={<Deletedlayout />}>
            <Route path="/del/categorias" element={<CategoriesDeleteView />} /> 
            <Route path="/del/productos" element={<ProductsDeleteView />} /> 
            <Route path="/del/bodegas" element={<WarehouseDeleteView />} /> 
            <Route path="/del/inventarios" element={<InventoryDeleteView />} /> 
            <Route path="/del/proveedores" element={<SupplierDeletedView />} /> 
          </Route>

        </Route>

        <Route element={<User />}>
          <Route path='/login' element={<LoginView />} />
          <Route path='/registrar' element={<RegisterView />} />
          {/* <Route path='/olivde-contraseña' element={<p>EL otro del otro</p>} /> */}
        </Route>
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
}

export default Router;
