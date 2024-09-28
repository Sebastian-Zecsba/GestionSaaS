import React from 'react'

const CategoryForm = ({register}) => {
  return (
    <div>
        <div>
            <label
                className="font-normal text-2xl"
                htmlFor="name"
            >Nombre de la Categoria</label>
            <input
                id="name"
                type="text"
                placeholder="Nombre de la categoria"
                className="w-full p-3  border-gray-300 border"
                {...register("name")}
            />
        </div>
        <div>
            <label
                className="font-normal text-2xl"
                htmlFor="description"
            >Descripción</label>
            <input
                id="description"
                type="text"
                placeholder="Nombre de la categoria"
                className="w-full p-3  border-gray-300 border"
                {...register("description")}
            />
        </div>
    </div>
  )
}

export default CategoryForm