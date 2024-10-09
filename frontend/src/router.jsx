import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/App.layout';
import Deletedlayout from './layouts/Deleted.layout';
import { 
    CategoriesDeleteView, 
    CategoriesView, 
    DashboardView, 
    DeletedView, 
    InventoryDeleteView, 
    InventoryView, 
    MovementsView, 
    ProductsDeleteView, 
    ProductsView, 
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
          <Route path="/movimientos" element={<MovementsView />} />

          <Route path='/del' element={<Deletedlayout />}>
            <Route path="/del/categorias" element={<CategoriesDeleteView />} /> 
            <Route path="/del/productos" element={<ProductsDeleteView />} /> 
            <Route path="/del/bodegas" element={<WarehouseDeleteView />} /> 
            <Route path="/del/inventarios" element={<InventoryDeleteView />} /> 
            <Route path="/del/proveedores" element={<p>Aca iran proveedores pero no tenemos aun. JEJE</p>} /> 
          </Route>

        </Route>
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
}

export default Router;
