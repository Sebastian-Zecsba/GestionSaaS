import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Dialog, DialogPanel } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import CategoryForm from './CategoryForm'
import { getCategoryById, upatedCategoryById } from '../../store/slices/category.slice'

const EditCategory = ({currentPage}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)
    const categoryId = queryParams.get('editCategory')
    const show = Boolean(categoryId);

    const dataCategory = useSelector((state) => state.category.categoryById)

    const { handleSubmit, register, reset } = useForm()

    useEffect(() => {
        if (categoryId) {
            dispatch(getCategoryById(categoryId));
        }
    }, [show])

    useEffect(() => {
        if (dataCategory) {
            reset({
                name: dataCategory.name,
                description: dataCategory.description,
            });
        }
    }, [dataCategory, reset]);

    const closeModal = () => {
        navigate(location.pathname, { replace: true })
        reset()
    }

    const handleUpdated = (data) => {
        dispatch(upatedCategoryById(data, categoryId, currentPage))
        closeModal();
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

                <form onSubmit={handleSubmit(handleUpdated)}>

                    <CategoryForm 
                        register={register}
                    />

                    <button
                        type="submit"
                        className="w-full p-3 text-center text-white bg-blue-500 hover:bg-blue-700 rounded-lg"
                    >
                        Actualizar Categoria
                    </button>
                </form>

            </DialogPanel>
        </div>
    </Dialog>
</>
  )
}

export default EditCategory