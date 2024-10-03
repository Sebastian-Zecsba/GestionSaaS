import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk } from '../../store/slices/product.slice';
import { getWarehousesThunk } from '../../store/slices/warehouse.slice';

const InvetoryForm = ({ register }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.data);
  const warehouses = useSelector((state) => state.warehouse.data); // Asegúrate de que sea 'warehouses' en plural

  useEffect(() => {
    dispatch(getProductsThunk());
    dispatch(getWarehousesThunk());
  }, [dispatch]);

  return (
    <div>
      <div className='flex flex-col gap-3 my-6'>
        <label className="font-normal text-2xl" htmlFor="product">
          Producto
        </label>
        <select id="product" {...register("product")}>
          <option value=""> -- Selecciona un Producto ---</option>
          {products.allProducts?.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
      <div className='flex flex-col gap-3 my-6'>
        <label className="font-normal text-2xl" htmlFor="warehouse">
          Bodega
        </label>
        <select id="warehouse" {...register("warehouse")}>
          <option value=""> -- Selecciona una Bodega ---</option>
          {warehouses.allWarehouses?.map((warehouse) => (
            <option key={warehouse.id} value={warehouse.id}>
              {warehouse.name}
            </option>
          ))}
        </select>
      </div>
      <div className='flex flex-col gap-3 my-6'>
        <label className="font-normal text-2xl" htmlFor="quantity">
          Cantidad del producto
        </label>
        <input
          id="quantity"
          type="text"
          placeholder="Ingresa la cantidad del producto"
          className="w-full p-3 border-gray-300 border"
          {...register("quantity")}
        />
      </div>
    </div>
  );
};

export default InvetoryForm;
