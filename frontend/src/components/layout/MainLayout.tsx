import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div className="w-full h-screen overflow-auto">
      <Outlet />
    </div>
  )
}

export default MainLayout