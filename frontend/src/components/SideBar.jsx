import { useState } from "react";
import { Link } from "react-router-dom";


const SideBar = () => {

  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", srcLogo: "dashboard", src: "/" },
    { title: "Categorias", srcLogo: "categorias", src: "/categories"},
    { title: "Productos", srcLogo: "productos", src: "/" },
    { title: "Bogedas", srcLogo: "bodegas", src: "/" },
    { title: "Inventario", srcLogo: "inventario", src: "/" },
    { title: "Proveedores", srcLogo: "proveedores", src: "/"},
    { title: "Movimientos", srcLogo: "movimientos", src: "/" },
  ];

  return (
    <div className="bg-gray-50">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-11 w-7 rounded-full  ${!open && "rotate-180"}`}
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
              <Link to={Menu.src} key={index}>
                <li
                  key={index}
                  className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-black text-lg items-center gap-x-4 
                  ${Menu.gap ? "mt-9" : "mt-2"} ${
                    index === 0 && "bg-light-white"
                  } `}
                >
                  <img src={`./src/assets/${Menu.srcLogo}.png`} />
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