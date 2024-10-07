import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/App.layout';
import Deletedlayout from './layouts/Deleted.layout';
import { 
    CategoriesDeleteView, 
    CategoriesView, 
    DashboardView, 
    DeletedView, 
    InventoryView, 
    MovementsView, 
    ProductsView, 
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

          <Route element={<Deletedlayout />}>
            <Route path="/del" element={<DeletedView />} index /> 
            <Route path="/categorias/del" element={<CategoriesDeleteView />} index /> 
          </Route>

        </Route>
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
}

export default Router;
