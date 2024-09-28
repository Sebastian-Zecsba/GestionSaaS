import {Link, Outlet} from 'react-router-dom'
import SideBar from '../components/SideBar'

const AppLayout = () => {

  

  return (
    <>
      <div className="flex">

        <SideBar />
        
        <div className="h-screen flex-1 p-7">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default AppLayout