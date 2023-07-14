import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan, faLeftLong, faComment } from '@fortawesome/free-solid-svg-icons'
import { confirmAlert, deleteHeroe, getHeroById, selectImg, simpleAlert, toast } from '../helpers';
import { Comentarios, FormularioHeroe } from '../components';
import { AuthContext } from '../../auth/context/AuthContext';


export const HeroPage = () => {

  const { user } = useContext( AuthContext );

  // Obtenemos id del héroe (de la url).
  const { id } = useParams();
  const navigate = useNavigate();

  // States
  const [ heroe, setHeroe ] = useState(null);
  const [mostrarImg, setMostrarImg] = useState(false);
  const [mostrarBtns, setMostrarBtns] = useState(false);
  const [ modalShow, setModalShow ] = useState(false);

  //States-Icons
  const [overEdit, setOverEdit] = useState(false);
  const [overDelete, setOverDelete] = useState(false);
  const [overRegresar, setOverRegresar] = useState(false);
  const [overComentar, setOverComentar] = useState(false);

  // refs
  const bodyTop = useRef();

  const mostrarModalComentarios = () => {
    setModalShow(true); 
  };

  // Ocultar/Mostrar formulario.
  const [ mostrarForm, setMostrarForm ] = useState(false);

  useEffect(() => {
    mostrarHeroe(id);
    if (imgRef.current?.complete) {
      onLoad();
    };
  }, []);

  // Btn regresar
  const onNavigateBack = () => {
    navigateBack();
  };

  // Mostrar ocultar formulario.
  const btnToogle = () => {
    setMostrarForm(!mostrarForm);
  };

  // spinner imagen.
  const imgRef =  useRef();
  
  const onLoad = () => {
    setMostrarImg(true);
  };

  // Restricciones admin.
  const restringirAcciones = (heroe) => {
    if(user.admin || heroe.usuario.id == user.id) {
      setMostrarBtns(true);
    };
  };

  // Peticiones.
  const mostrarHeroe = (id) => {
    getHeroById(id)
    .then( (heroe) => {
      setHeroe(heroe);
      restringirAcciones(heroe);
    })
    .catch( (error) => {
      console.log(error)
      simpleAlert('Ha ocurrido un error', error.response.data.error, 'error');
      navigate('../marvel', {replace: true});
    });
  };

  const eliminarHeroe = (id) => {
    confirmAlert(`Desea eliminar a ${heroe.superhero}`, 'warning')
    .then((result) => {
      if (result.isConfirmed) {
        deleteHeroe(id)
        .then( (_) => {
          if(heroe.publisher == "Marvel Comics") {
            toast('¡Héroe eliminado!');
            navigate('../marvel', {replace: true});
          } else {
            toast('¡Héroe eliminado!');
            navigate('../dc', {replace: true});
          };
        })
        .catch( (error) => {
          console.error(error);
          simpleAlert('Ha ocurrido un error', error.response.data.error, 'error');
        });
      };
    });
  };

  // Helpers
  const navigateBack = () => {
    const lastPath = localStorage.getItem("lastPath");
    switch (lastPath) {
      case "/marvel":
        navigate("../marvel");
      break;
      case "/dc":
        navigate("../dc");
      break;
      case "/misheroes":
        navigate("../misheroes");
      break;
      case "/search":
        navigate("../search");
      break;
      case "/admin":
        navigate("../admin");
      break;
      default:
        navigate("../marvel");
      break;
    };
  };

  const scrollTop = () => {
    scrollToTop();
  };

  const scrollToTop = () => {
    setTimeout(() => {
      bodyTop.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <div ref={bodyTop}></div>
      <div className="row mt-5 minHeightHeroPage" style={{marginBottom:'45px'}}>
        <div className="col-4">
          {
            !mostrarImg &&
            <div 
                style={{
                    height:'100%', 
                    width:'100%', 
                    display:'grid',
                    placeItems: 'center',
                }}
            >
              <div className="spinner-border text-primary " style={{width: '4rem', height: '4rem'}} role="status"></div>
            </div>
          }
          <img 
            ref={ imgRef }
            src={ selectImg(heroe) } 
            alt={ heroe?.superhero }
            className="img-thumbnail animate__animated animate__fadeInLeft"
            onLoad={ onLoad }
            decoding='async'
          />
        </div>
        { heroe &&
          <div className="col-8">

            <h3>{ heroe.superhero }</h3>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"> <b>Alter Ego:</b> { heroe.alter_ego } </li>
              <li className="list-group-item"> <b>Editorial:</b> { heroe.publisher } </li>
              <li className="list-group-item"> <b>Primera aparición:</b> { heroe.first_appearance } </li>
              <li className="list-group-item"> <b>Personajes:</b> { heroe.characters } </li>
            </ul>

            <h5 className="mt-3"> Habilidades: </h5>
            <p>{ heroe.habilities }</p>

          <div style={{display: 'flex', justifyContent: 'flex-start', alignContent: 'center', flexWrap: 'wrap', gap:'10px'}}>
            <button 
              className="btn btn-outline-primary"
              onClick={ onNavigateBack }
              onMouseOver={() =>  setOverRegresar(true)}
              onMouseLeave={() =>  setOverRegresar(false)}
            >
              <span className=' displayCenter'>
                <FontAwesomeIcon 
                  icon={faLeftLong} 
                  color={ (overRegresar) ? "white" : "#0d6efd"}
                  fontSize={24} 
                  className='me-2' 
                />
                Regresar
              </span>
            </button>

            { mostrarBtns &&
              <button 
                className="btn btn-outline-danger"
                onClick={ () => eliminarHeroe(heroe.id) }
                onMouseOver={() =>  setOverDelete(true)}
                onMouseLeave={() =>  setOverDelete(false)}
              >
                <span className=' displayCenter'>
                  <FontAwesomeIcon 
                    icon={faTrashCan} 
                    color={ (overDelete) ? "white" : "#dc3545"}
                    fontSize={20} 
                    className='me-2' 
                  />
                  Eliminar
                </span>
              </button>
            }
            { mostrarBtns &&
              <button 
                className="btn btn-outline-info"
                onClick={ () => btnToogle() }
                onMouseOver={() =>  setOverEdit(true)}
                onMouseLeave={() =>  setOverEdit(false)}
              >
                <span className=' displayCenter'>
                  <FontAwesomeIcon 
                    icon={faPen} 
                    color={ (overEdit) ? "black" : "#0dcaf0"}
                    fontSize={20} 
                    className='me-2' 
                  />
                  Editar
                </span>
              </button>
            }
            <button 
              className="btn btn-outline-success"
              onClick={ () => mostrarModalComentarios() }
              onMouseOver={() =>  setOverComentar(true)}
              onMouseLeave={() =>  setOverComentar(false)}
            >
              <span className=' displayCenter'>
                <FontAwesomeIcon 
                  icon={faComment} 
                  color={ (overComentar) ? "white" : "#198754"}
                  fontSize={20} 
                  className='me-2' 
                />
                Comentarios
              </span>
            </button>
          </div>
            { mostrarForm && 
              <div style={{marginTop:'30px'}} className='col animate__animated animate__fadeIn'>
                <FormularioHeroe 
                  heroeSeleccionado = { heroe }  
                  onCambio={ mostrarHeroe } 
                  mostrarForm={ setMostrarForm }
                  scrollToTop = { scrollTop }
                />
              </div>
            }
            { modalShow &&
              <Comentarios
                show = { modalShow }
                usuarioAuth = { user }
                heroeId = { heroe.id }
                heroeNombre = { heroe.superhero }
                onHide={() => setModalShow(false)}
              />
            }
          </div>
        }
      </div>
    </>
  );
};
