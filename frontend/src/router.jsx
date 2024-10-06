import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/App.layout';
import { CategoriesView, DashboardView, InventoryView, ProductsView, WarehouseView } from './views';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MovementsView from './views/movements/MovementsView';

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
        </Route>
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
}

export default Router;
