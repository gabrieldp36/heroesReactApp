import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
    navigate(-1);
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

  return (
    <div className="row mt-5" style={{marginBottom:'45px'}}>

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

          <button 
            className="btn btn-outline-primary"
            onClick={ onNavigateBack }
          >
            Regresar
          </button>

          { mostrarBtns &&
            <button 
              className="btn btn-outline-danger ms-2"
              onClick={ () => eliminarHeroe(heroe.id) }
            >
              Eliminar
            </button>
          }

          { mostrarBtns &&
            <button 
              className="btn btn-outline-info ms-2"
              onClick={ () => btnToogle() }
            >
              Editar
            </button>
          }
          { mostrarBtns &&
            <button 
              className="btn btn-outline-success ms-2 btnComentariosMT"
              onClick={ () => mostrarModalComentarios() }
            >
              Comentarios
            </button>
          }
          { mostrarForm && 
            <div style={{marginTop:'30px'}} className='col animate__animated animate__fadeIn'>
              <FormularioHeroe heroeSeleccionado = { heroe }  onCambio={ mostrarHeroe } mostrarForm={ setMostrarForm }/>
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
  );
};
