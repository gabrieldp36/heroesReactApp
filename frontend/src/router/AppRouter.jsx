import { Navigate, Route, Routes } from 'react-router-dom';
import { HeroesRoutes } from '../heroes';
import { LoginPage } from '../auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/context/AuthContext';
import { RegistroPage } from '../auth/pages/RegistroPage';

export const AppRouter = () => {

  let { checkToken } = useContext( AuthContext );
  const [mostrarApp, setMotrarApp] = useState(false)

  useEffect( () => {
    checkToken()
    .then((_) => {
      setMotrarApp(true);
    });
  },[])
  
  return (
    <>
      {
        mostrarApp &&
        <Routes>
          <Route
            path="login/*"
            element={
              <PublicRoute>
                {/* <LoginPage /> */}
                <Routes>
                  <Route path="/registro" element={<RegistroPage />} />
                  <Route path="/*" element={<LoginPage />} replace={true}/>
                </Routes>
              </PublicRoute>
            }
          />

          <Route
            path="/*"
            element={
              <PrivateRoute>
                <HeroesRoutes />
              </PrivateRoute>
            }
          />
        </Routes>
      }
    </>
  );
}
