import { Outlet, useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import { useEffect, useState } from 'react';
import axios from '../utils/axios';

const AppLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const callApi = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('/auth/validate-token', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.data.isValid) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error al validar el token:', error);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    callApi();
  }, [navigate]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 p-7 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
