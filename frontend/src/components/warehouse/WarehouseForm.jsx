import React from 'react'

const WarehouseForm = ({register}) => {
  return (
    <div>
        <div className='flex flex-col gap-3 my-6'>
            <label
                className="font-normal text-2xl"
                htmlFor="name"
            >Nombre de la bodega</label>
            <input
                id="name"
                type="text"
                placeholder="Nombre de la bodega"
                className="w-full p-3  border-gray-300 border"
                {...register("name")}
            />
        </div>
        <div className='flex flex-col gap-3 my-6'>
            <label
                className="font-normal text-2xl"
                htmlFor="address"
            >Dirección de la bodega</label>
            <input
                id="address"
                type="text"
                placeholder="Nombre de la bodega"
                className="w-full p-3  border-gray-300 border"
                {...register("address")}
            />
        </div>
    </div>
  )
}

export default WarehouseForm