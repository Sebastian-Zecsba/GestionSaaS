import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/App.layout'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route element={<AppLayout />}>

          <Route path="/" element={<h1 className='text-2xl font-semibold'>Dashboard</h1>} />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default Router
