import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getWarehousesThunk } from '../../store/slices/warehouse.slice';
import { getProductsThunk } from '../../store/slices/product.slice';

const MovementForm = ({ register }) => {

    const dispatch = useDispatch()
    const products = useSelector((state) => state.product.data);
    const warehouses = useSelector((state) => state.warehouse.data); 

    useEffect(() => {
        dispatch(getProductsThunk())
        dispatch(getWarehousesThunk())
    }, [])

  return (
    <div>
      <div className='flex flex-col gap-3 my-6'>
        <label className="font-normal text-2xl" htmlFor="product">
          Producto
        </label>
        <select id="product" {...register("product")}>
          <option value=""> -- Selecciona un Producto ---</option>
          {products.allProducts?.filter(product => !product.isDeleted)
            .map((product) => (
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
          {warehouses.allWarehouses?.filter(warehouses => !warehouses.isDeleted)
            .map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </option>
            ))}
        </select>
      </div>
      
      <div className='flex flex-col gap-3 my-6'>
        <label className="font-normal text-2xl">
          Tipo de Movimiento
        </label>
        <div>
          <label>
            <input
              type="radio"
              value="entrada"
              {...register("movement_type")}
            />
            Entrada
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="salida"
              {...register("movement_type")}
            />
            Salida
          </label>
        </div>
      </div>
      
      <div className='flex flex-col gap-3 my-6'>
        <label className="font-normal text-2xl" htmlFor="quantity">
          Cantidad del producto
        </label>
        <input
          id="quantity"
          type="number"
          placeholder="Ingresa la cantidad del producto"
          className="w-full p-3 border-gray-300 border"
          {...register("quantity", {
            valueAsNumber: true
          })}
        />
      </div>
    </div>
  );
}

export default MovementForm;
