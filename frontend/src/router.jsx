import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/App.layout';
import { CategoriesView, DashboardView, ProductsView, WarehouseView } from './views';
import Notification from './components/Notification';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path="/categorias" element={<CategoriesView />} />
          <Route path="/productos" element={<ProductsView />} />
          <Route path="/bodegas" element={<WarehouseView />} />
        </Route>
      </Routes>

      <Notification />
    </BrowserRouter>
  );
}

export default Router;
