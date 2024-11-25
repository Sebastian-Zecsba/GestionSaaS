import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLoggedThunk } from '../../store/slices/user.slice';
import { useNavigate } from 'react-router-dom';

const User = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [isHovered, setIsHovered] = useState(false); 

    useEffect(() => {
        dispatch(getUserLoggedThunk());
    }, []);

    const logOut = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <div className='flex justify-center items-center sm:mr-20'>

            <div 
                className='relative w-16 h-16 bg-white rounded-full shadow-lg' 
                onMouseEnter={() => setIsHovered(true)} // Cuando el ratón entra
                onMouseLeave={() => setIsHovered(false)} // Cuando el ratón sale
            >
                <img 
                    src="./assets/logo.svg" 
                    alt="Goofy"
                    className='w-16 h-16 rounded-full' />

                {isHovered && (
                    <div className='absolute  -right-[100%] text-white bg-black rounded w-52 p-3'>
                        <div>Nombre: {user.name}</div>
                        <div>Correo: {user.email}</div>
                        <button 
                            className='bg-red-500 hover:bg-red-700 p-3 w-full mt-2'
                            onClick={() => logOut()}    
                        > Cerrar Sesion </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default User;
