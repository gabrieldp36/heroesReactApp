import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBan } from '@fortawesome/free-solid-svg-icons'
import { HeroCard } from '../components';
import { searchHero } from '../helpers';

const schema = yup.object().shape({
  busqueda: yup.string().required('El campo es obligatorio'),
});

export const SearchPage = () => {

  const { register, handleSubmit, setValue, clearErrors, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  // States
  const [ heroes, setHeroes ] = useState([]);
  const [ sinResultados, setSinResultados ] = useState(false);

  //States-Icons
  const [overBuscar, setOverBuscar] = useState(false);
  const [overDescartar, setOverDescartar] = useState(false);
  
  const buscarHeroes = ({busqueda: termino}) => {
    searchHero(termino)
    .then( (resultados) => {
      (resultados.length === 0) ?  setSinResultados(true) : setSinResultados(false);
      setHeroes(resultados);
    })
    .catch( (error) => {
      console.error(error);
    });
  };

  const resetForm = () => {
    setValue('busqueda', null);
    clearErrors();
    setHeroes([]);
  };

  return (
    <div className='mb-4 animate__animated animate__fadeIn minHeight'>
      <h1>Buscador</h1> 
      <hr />

      <div className="row">

        <div className="col-lg-5 col-md-5 col-xs-12 mb-4">
          <h4>¡Busca un héroe!</h4>
          <hr />
          <form onSubmit={ handleSubmit(buscarHeroes) }>
            <div className="mb-3">
              <input 
                type="text"  
                className={`form-control ${(errors.busqueda) ? 'is-invalid' : ''} `}  
                id="busqueda" 
                {...register("busqueda")}
              />
              {errors.busqueda && <small className={'text-danger'}>{errors.busqueda.message}</small>}
            </div>
            <button 
              type="submit" 
              className="btn btn-outline-primary mt-1" 
              disabled={!isValid}
              onMouseOver={() =>  setOverBuscar(true)}
              onMouseLeave={() =>  setOverBuscar(false)}
            >
              <span className=' displayCenter'>
                <FontAwesomeIcon 
                  icon={faMagnifyingGlass} 
                  color={ (overBuscar) ? "white" : "#0d6efd"}
                  fontSize={20} 
                  className='me-2' 
                />
                Buscar
              </span>
            </button>
            <button 
              type="button" 
              className="btn btn-outline-secondary mt-1 ms-2" 
              onClick={resetForm}
              onMouseOver={() =>  setOverDescartar(true)}
              onMouseLeave={() =>  setOverDescartar(false)}
            >
              <span className=' displayCenter'>
                <FontAwesomeIcon 
                  icon={faBan} 
                  color={ (overDescartar) ? "white" : "#6c757"}
                  fontSize={20} 
                  className='me-2' 
                />
                Descartar
              </span>
            </button>
          </form>
        </div>

        <div className="col-lg-7 col-md-7 col-xs-12">
          <h4>Resultados</h4>
          <hr />
          { (heroes.length === 0 && !sinResultados) &&
            <div className="alert alert-primary animate__animated animate__fadeIn">
              Busca un héroe.
            </div>
          }

          { sinResultados &&
            <div className="alert alert-danger animate__animated animate__fadeIn" >
              No se han encontrado resultados.
            </div>
          }

          {
            heroes.map( hero => (
              <HeroCard key={ hero.id } {...hero } />
            ))
          }
        </div>
      </div>
    </div>
  );
};
