import React from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import WarehouseForm from './WarehouseForm'
import { useDispatch } from 'react-redux'
import { createWarehouseThunk } from '../../store/slices/warehouse.slice'

const CreateWarehouse = ({currentPage}) => {

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const quetyParams = new URLSearchParams(location.search)
    const modalWarehouse = quetyParams.get('bodega')
    const show = modalWarehouse ? true : false

    const {handleSubmit, register, reset } = useForm()

    const handleCreate = (data) => {
        dispatch(createWarehouseThunk(data, currentPage))
        navigate(location.pathname, { replace: false })
        reset()
    }

    const closeModal = () => {
        navigate(location.pathname, { replace: true })
        reset()
    }

  return (
    <>
            <Dialog 
                open={show}
                onClose={closeModal} 
                transition
                className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
             >
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-md transform flex flex-col gap-6 rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all duration-300 ease-in-out data-[state=open]:animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 sm:max-w-xl">

                        <form onSubmit={handleSubmit(handleCreate)}>
                            <WarehouseForm 
                                register={register}
                            />
                            <button
                                type="submit"
                                className="w-full p-3 text-center text-white bg-blue-500 hover:bg-blue-700 rounded-lg"
                            >
                                Agregar Bodega
                            </button>
                        </form>

                    </DialogPanel>
                </div>
            </Dialog>
    </>
  )
}

export default CreateWarehouse