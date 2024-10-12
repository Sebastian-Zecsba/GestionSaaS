import React from 'react'

const SupplierForm = ({register}) => {
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
                    placeholder="Nombre del proveedor"
                    className="w-full p-3  border-gray-300 border"
                    {...register("name")}
                />
            </div>
            <div className='flex flex-col gap-3 my-6'>
                <label
                    className="font-normal text-2xl"
                    htmlFor="phone"
                >Telefono del proveedor</label>
                <input
                    id="phone"
                    type="phone"
                    placeholder="Telefono del proveedor"
                    className="w-full p-3  border-gray-300 border"
                    {...register("phone")}
                />
            </div>
            <div className='flex flex-col gap-3 my-6'>
                <label
                    className="font-normal text-2xl"
                    htmlFor="email"
                >Correo electronico del proveedor</label>
                <input
                    id="email"
                    type="text"
                    placeholder="Coreo electronico del proveedor"
                    className="w-full p-3  border-gray-300 border"
                    {...register("email")}
                />
            </div>
            <div className='flex flex-col gap-3 my-6'>
                <label
                    className="font-normal text-2xl"
                    htmlFor="address"
                >Dirección del proveedor</label>
                <input
                    id="address"
                    type="text"
                    placeholder="Dirección del proveedor"
                    className="w-full p-3  border-gray-300 border"
                    {...register("address")}
                />
            </div>
        </div>
      )
}

export default SupplierForm