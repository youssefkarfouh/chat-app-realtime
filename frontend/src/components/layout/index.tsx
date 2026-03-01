import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="w-full h-screen overflow-auto">
      <Outlet />
    </div>
  )
}

export default Layout