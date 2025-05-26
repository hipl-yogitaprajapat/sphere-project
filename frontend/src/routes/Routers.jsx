import { Routes,Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '../utils/ProtectedRoute'
import { Suspense, useState } from 'react'
import MainRoutes from './MainRoutes';



const Routers = () => {
     const [isAuthenticated, setIsAuthenticated] = useState(false);     

  const PrivateRoute = ({ Component }) => {
    return isAuthenticated ? <Component /> : <Navigate to="/login" />
  }

  return (
    <>
      <ProtectedRoute setIsAuthenticated={setIsAuthenticated} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {MainRoutes.map(({ path, Component, protected: isProtected }) => (
            <Route
              key={path}
              path={path}
              element={
                isProtected ? <PrivateRoute Component={Component} /> : <Component />
              }
            />
          ))}
        </Routes>
      </Suspense>
    </>

  )
}

export default Routers