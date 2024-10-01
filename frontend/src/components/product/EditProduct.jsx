import { Dialog, DialogPanel } from '@headlessui/react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router-dom'
import ProductForm from './ProductForm'
import { useDispatch, useSelector } from 'react-redux'
import { getProductByIdThunk, upadateProductByIdThunk } from '../../store/slices/product.slice'

const EditProduct = ({currentPage}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const modalProduct = queryParams.get('editarProducto')
    const show = modalProduct ? true : false

    const { handleSubmit, register, reset } = useForm()
    const dataProduct = useSelector((state) => state.product.productById)

    useEffect(() => {
        if(modalProduct){
            dispatch(getProductByIdThunk(modalProduct))
        }
    }, [show])

    useEffect(() => {
        if(dataProduct){
            reset({
                name: dataProduct.name,
                description: dataProduct.description,
                price: dataProduct.price,
                stock: dataProduct.stock,
                category: dataProduct.category ? dataProduct.category : 'select'
            })
        }
    }, [dataProduct, reset])

    const handleEdit = (data) => {
        if(data.category === 'select') throw console.log('Debes seleccionar una categoria valida')

        dispatch(upadateProductByIdThunk(modalProduct, data, currentPage))
        navigate(location.pathname, {replace: true})
        reset()
    }

    const closeModal = () => {
        navigate(location.pathname, {replace: true})
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

                        <form onSubmit={handleSubmit(handleEdit)}>
                            <ProductForm 
                                register={register}
                            />
                            <button
                                type="submit"
                                className="w-full p-3 text-center text-white bg-blue-500 hover:bg-blue-700 rounded-lg"
                            >
                                Actualizar Producto
                            </button>
                        </form>

                    </DialogPanel>
                </div>
            </Dialog>
        </>
  )
}

export default EditProduct