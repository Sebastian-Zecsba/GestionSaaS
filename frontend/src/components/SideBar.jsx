import { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = () => {

  const [open, setOpen] = useState(true);

  const Menus = [
    { title: "Dashboard", srcLogo: "dashboard", src: "/" },
    { title: "Categorias", srcLogo: "categorias", src: "/categorias"},
    { title: "Productos", srcLogo: "productos", src: "/productos" },
    { title: "Bogedas", srcLogo: "bodegas", src: "/bodegas" },
    { title: "Inventario", srcLogo: "inventario", src: "/inventario" },
    { title: "Proveedores", srcLogo: "proveedores", src: "/proveedores"},
    { title: "Movimientos", srcLogo: "movimientos", src: "/movimientos" },
    { title: "Papelera", srcLogo: "trash", src: "/del"}
  ];

  return (
    <div className="bg-gray-50 z-10">
      <div
        className={` ${
          open ? "w-72 sm:w-72" : "w-1 sm:w-20"
        } bg-dark-purple h-screen p-5 pt-8 relative duration-300 bg-gray-50 `}
      >
        <img
          src="/assets/control.png"
          className={`absolute cursor-pointer right-3 sm:-right-3 top-11 w-7 rounded-full ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center hidden sm:flex">
          <img
            src="/assets/logo.svg"
            className={`cursor-pointer duration-500 ${ open && "rotate-[360deg]"}`}
          />
        </div>
        <ul className={`pt-0 sm:pt-6 ${open ? "block sm:block" : "hidden sm:block"} ` }>
          {Menus.map((Menu, index) => (
              <Link to={Menu.src} key={index}>
                <li
                  key={index}
                  className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-black text-lg items-center gap-x-4 
                  ${Menu.gap ? "mt-9" : "mt-2"} ${
                    index === 0 && "bg-light-white"
                  } `}
                >
                  <img src={`/assets/${Menu.srcLogo}.png`} />
                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                    {Menu.title}
                  </span>
                </li>
              </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SideBar