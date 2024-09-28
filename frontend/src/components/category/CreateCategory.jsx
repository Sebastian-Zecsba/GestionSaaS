import { useLocation, useNavigate } from "react-router-dom"
import { Dialog, DialogPanel} from '@headlessui/react'
import { useForm } from 'react-hook-form'
import React from 'react'
import CategoryForm from "./CategoryForm"
import { useDispatch } from 'react-redux'
import { createCategoryThunk } from "../../store/slices/category.slice"

const CreateCategory = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const modalTask = queryParams.get('categoria')
    const show = modalTask ? true : false
    const dispatch = useDispatch()

    const { register, handleSubmit } = useForm()

    const onSubmit = (data) => {
       dispatch(createCategoryThunk(data))
       navigate(location.pathname, { replace: false })
    }

    const closeModal = () => {
        navigate(location.pathname, { replace: true })
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

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <CategoryForm 
                                register={register}
                            />
                            <button
                                type="submit"
                                className="w-full p-3 text-center text-white bg-black rounded-lg"
                            >
                                Agregar Categoria
                            </button>
                        </form>

                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default CreateCategory
