import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDefinitelySupplierById,
  getSuppliersThunk,
  restoreSupplierById,
} from "../../store/slices/supplier.slice";

const SupplierDeletedView = () => {
  const dispatch = useDispatch();
  const suppliers = useSelector((state) => state.supplier);

  useEffect(() => {
    dispatch(getSuppliersThunk());
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-bold mb-6">Lista de Proveedores</h2>

      {suppliers.data.suppliers?.filter((supplier) => supplier.isDeleted)
        .length > 0 ? (
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left">
              <th className="pb-4 w-3/12">Nombre</th>
              <th className="pb-4 w-3/12">Dirección</th>
              <th className="pb-4 w-2/12">Correo</th>
              <th className="pb-4 w-2/12">Telefono</th>
              <th className="pb-4 w-3/12">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.data.suppliers
              .filter((supplier) => supplier.isDeleted)
              .map((supplier) => (
                <tr key={supplier.id} className="border-t hover:bg-slate-50">
                  <td className="py-3">{supplier.name}</td>
                  <td className="py-3">{supplier.address}</td>
                  <td className="py-3">{supplier.email}</td>
                  <td className="py-3">{supplier.phone}</td>
                  <td>
                    <button
                      onClick={() => dispatch(restoreSupplierById(supplier.id))}
                      className="bg-orange-400 hover:bg-orange-500 text-white px-3 p-1 rounded-[10px]"
                    >
                      Renovar
                    </button>
                    <button
                      onClick={() =>
                        dispatch(deleteDefinitelySupplierById(supplier.id))
                      }
                      className="bg-red-500 hover:bg-red-700 text-white px-3 p-1 rounded-[10px]"
                    >
                      Eliminar Definitivamente
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <div className="flex gap-10 py-4 items-center">
          <p>No tienes aun nada eliminado</p>
        </div>
      )}
    </div>
  );
};

export default SupplierDeletedView;
