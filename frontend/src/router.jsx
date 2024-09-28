import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/App.layout'
import DashboardView from './views/DashboardView'
import CategoriesView from './views/categories/CategoriesView'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route element={<AppLayout />}>

          <Route path="/" element={<DashboardView />} index />
          <Route path="/categories" element={<CategoriesView />} />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default Router
