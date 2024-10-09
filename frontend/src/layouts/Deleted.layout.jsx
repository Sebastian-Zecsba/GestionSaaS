import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoriesThunk } from '../store/slices/category.slice';
import { getProductsThunk } from '../store/slices/product.slice';
import { getWarehousesThunk } from '../store/slices/warehouse.slice';
import { getInventoryThunk } from '../store/slices/inventory.slice';

const Deletedlayout = () => {

  const dispatch = useDispatch();
    const categoryInformation = useSelector((state) => state.category.data.categories?.filter(category => category.isDeleted).length);
    const productInformation = useSelector((state) => state.product.data.products?.filter(product => product.isDeleted).length);
    const warehouseInformation = useSelector((state) => state.warehouse.data.warehouses?.filter(warehouse => warehouse.isDeleted).length);
    const inventoryInformation = useSelector((state) => state.inventory.data.inventories?.filter(inventory => inventory.isDeleted).length);

    useEffect(() => {
      dispatch(getCategoriesThunk());
      dispatch(getProductsThunk());
      dispatch(getWarehousesThunk());
      dispatch(getInventoryThunk());
    }, []);

  const routes = [
    { path: '/del/categorias', title: 'categorias', count: categoryInformation },
    { path: '/del/productos', title: 'productos', count: productInformation },
    { path: '/del/bodegas', title: 'bodegas', count: warehouseInformation },
    { path: '/del/proveedores', title: 'proveedores', count: categoryInformation },
    { path: '/del/inventarios', title: 'inventarios', count: inventoryInformation }
  ]

  return (
    <div className="p-6">
  <div className="bg-white p-6 shadow-lg rounded-lg text-center">
    <h1 className="text-3xl font-bold mb-4">Papelera de Elementos Eliminados</h1>
    <p className="text-gray-600">Aquí puedes gestionar todos los elementos que has eliminado. Puedes restaurarlos o eliminarlos definitivamente.</p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
    {routes.map((route, index) => (
      <Link key={index} to={route.path} className="block bg-gray-100 p-6 rounded-lg shadow hover:bg-gray-200">
        <div className="flex items-center space-x-4">
          <div>
            <h3 className="text-lg font-semibold capitalize">{route.title}</h3>
            <p className="text-gray-600">{`Número de eliminados: ${route.count}`}</p>
          </div>
        </div>
      </Link>
    ))}
  </div>
    <div>
      <Outlet />
    </div>
  </div>

  )
}

export default Deletedlayout