import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../auth';
import { FooterComponent, NavbarComponent } from '../../ui';
import { AdminPage, CreacionesPage, DcPage, HeroPage, MarvelPage, PerfilPage, PropiosPage, SearchPage } from '../pages';

export const HeroesRoutes = () => {

  const { user } = useContext( AuthContext );

  return (
    <>
      <NavbarComponent />
      <div className="container mb-4">
        <Routes>
          <Route path="marvel" element={<MarvelPage />} />
          <Route path="dc" element={<DcPage />} />
          <Route path="creaciones" element={<CreacionesPage />} />
          <Route path="misheroes" element={<PropiosPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="hero/:id" element={<HeroPage />} />
          <Route path="perfil" element={<PerfilPage />} />
          { user.admin && <Route path="admin" element={<AdminPage />} /> }
          <Route path="/" element={<Navigate to="/marvel" />} />
          <Route path="*" element={<Navigate to="/marvel" />} />
        </Routes>
      </div>
      <FooterComponent/>
    </>
  );
};
