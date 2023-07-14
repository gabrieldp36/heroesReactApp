import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/context/AuthContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { confirmAlert, selectPerfil } from '../../heroes/helpers';

const ocultarCanvas = (id) => {
  const body = document.getElementById(id);
  if(body) {
    new ResizeObserver(() => {
      const offCanvas = document.getElementById('offcanvasNavbar');
      const btnToggle = document.getElementById('btnToggleNavBar');
      if(offCanvas && btnToggle) {
        let offsetWidth =  body.offsetWidth;
        if(offsetWidth >= 970 && offCanvas.classList.contains('show')) {
          btnToggle.click();
        };
      }
    }).observe(body);
  };
};
ocultarCanvas('root');

export const NavbarComponent = () => {

  const { user, logout } = useContext( AuthContext );
  const navigate = useNavigate();

  const onLogout = () => {
    confirmAlert(`Está por salir de la aplicación`, 'question', 'top-end')
    .then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate('/login', {
          replace: true,
        });
      };
    });
  };

  const closeCanvas = () => {
    const offCanvas = document.getElementById('offcanvasNavbar');
    const btnToggle = document.getElementById('btnToggleNavBar');
    if(offCanvas.classList.contains('show')) {
      btnToggle.click();
    };
  };

  return (
    <>
      <Navbar
        expand={"lg"}
        variant="dark"
        bg="dark"
        data-bs-theme="dark"
        className="mb-3"
      >
        <Container fluid>
          <Navbar.Brand>
            <img src={'/assets/logoChico.png'} alt="" style={{width:'150px',}}/>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls={`offcanvasNavbar`} id="btnToggleNavBar" />

          <Navbar.Offcanvas
            id={`offcanvasNavbar`}
            aria-labelledby={`offcanvasNavbarLabel`}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel`}>
              <img src={'/assets/logoChicoNegro.png'} alt="" style={{width:'150px',}}/>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav style={{marginTop: '4px'}}>
                <NavLink
                  className={({ isActive }) =>
                    `nav-item nav-link itemBar ${isActive ? "active" : ""}`
                  }
                  to="/marvel"
                  onClick={closeCanvas}
                >
                  Marvel
                </NavLink>

                <NavLink
                  className={({ isActive }) =>
                    `nav-item nav-link itemBar ${isActive ? "active" : ""}`
                  }
                  to="/dc"
                  onClick={closeCanvas}
                >
                  DC
                </NavLink>

                <NavLink
                  className={({ isActive }) =>
                    `nav-item nav-link itemBar ${isActive ? "active" : ""}`
                  }
                  to="/misheroes"
                  onClick={closeCanvas}
                >
                  Mis héroes
                </NavLink>

                <NavLink
                  className={({ isActive }) =>
                    `nav-item nav-link itemBar ${isActive ? "active" : ""}`
                  }
                  to="/creaciones"
                  onClick={closeCanvas}
                >
                  Crear
                </NavLink>

                <NavLink
                  className={({ isActive }) =>
                    `nav-item nav-link itemBar ${isActive ? "active" : ""}`
                  }
                  to="/search"
                  onClick={closeCanvas}
                >
                  Buscar
                </NavLink>
                { user.admin &&
                  <NavLink
                    className={({ isActive }) =>
                      `nav-item nav-link itemBar ${isActive ? "active" : ""}`
                    }
                    to="/admin"
                    onClick={closeCanvas}
                  >
                    Administrar
                  </NavLink>
                }
              </Nav>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <span
                  className='navBarAvatar container animate__animated animate__fadeIn animate__slow avatarImgHidden'
                  style={{ backgroundImage: `url(${selectPerfil(user)})` }}
                  onClick={() => navigate('/perfil')}
                ></span>

                <span className='lineaVertical avatarImgHidden'></span>

                <span 
                  className="nav-item nav-link navBarUserName"
                  onClick={() => {closeCanvas(); navigate('/perfil');}}
                >
                  {user?.nombre}
                </span>

                <span
                  className="nav-item nav-link itemBarLogut"
                  style={{ cursor: "pointer" }}
                  onClick={onLogout}
                >
                  Logout
                </span>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};
