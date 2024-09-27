import {Link, Outlet} from 'react-router-dom'
import { useState } from "react";

const AppLayout = () => {

  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: "dashboard" },
    { title: "Usuario", src: "usuarios" },
    { title: "Categorias", src: "categorias"},
    { title: "Productos", src: "productos" },
    { title: "Bogedas", src: "bodegas" },
    { title: "Inventario", src: "inventario" },
    { title: "Proveedores", src: "proveedores"},
    { title: "Movimientos", src: "movimientos" },
  ];

  return (
    <>
      <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/assets/logo.svg"
            className={`cursor-pointer duration-500 ${ open && "rotate-[360deg]"}`}
          />
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-black text-lg items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <img src={`./src/assets/${Menu.src}.png`} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">
        <Outlet />
      </div>
    </div>
    </>
  )
}

export default AppLayout