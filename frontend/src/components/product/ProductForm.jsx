import React, { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { getCategoriesThunk } from '../../store/slices/category.slice'

const ProductForm = ({register}) => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getCategoriesThunk())
    }, [])

    const categories = useSelector((state) => state.category.categories)

  return (
    <div>
        <div className='flex flex-col gap-3 my-6'>
            <label
                className="font-normal text-2xl"
                htmlFor="name"
            >Nombre del Producto</label>
            <input
                id="name"
                type="text"
                placeholder="Nombre del Producto"
                className="w-full p-3  border-gray-300 border"
                {...register("name")}
            />
        </div>
        <div className='flex flex-col gap-3 my-6'>
            <label
                className="font-normal text-2xl"
                htmlFor="description"
            >Descripción</label>
            <input
                id="description"
                type="text"
                placeholder="Descripción del producto"
                className="w-full p-3  border-gray-300 border"
                {...register("description")}
            />
        </div>
        <div className='flex flex-col gap-3 my-6'>
            <label
                className="font-normal text-2xl"
                htmlFor="price"
            >Precio</label>
            <input
                id="price"
                type="text"
                placeholder="Precio"
                className="w-full p-3  border-gray-300 border"
                {...register("price")}
            />
        </div>
        <div className='flex flex-col gap-3 my-6'>
            <label
                className="font-normal text-2xl"
                htmlFor="stock"
            >Cantidad</label>
            <input
                id="stock"
                type="text"
                placeholder="Cantidad"
                className="w-full p-3  border-gray-300 border"
                {...register("stock")}
            />
        </div>
        <div className='flex flex-col gap-3 my-6'>
            <label
                className="font-normal text-2xl"
                htmlFor="stock"
            >Categories</label>
            <select id="category" {...register("category")}>
                <option value="select"> -- Selecciona un Categoria --</option>
                {categories.allCategories?.map((category) => (
                    <option key={category.id} value={category.id} >{category.name}</option>
                ))}
            </select>
        </div>
    </div>
  )
}

export default ProductForm