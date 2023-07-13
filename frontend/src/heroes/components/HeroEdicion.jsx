import React, { useEffect, useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faBan } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../../auth/context/AuthContext';
import { simpleAlert, toast } from '../helpers';

const schema = yup.object().shape({
    superhero: yup.string().required('El campo es obligatorio'),
    publisher: yup.string().required('El campo es obligatorio'),
    alter_ego: yup.string().required('El campo es obligatorio'),
    first_appearance: yup.string(),
    characters: yup.string(),
    habilities: yup.string().required('El campo es obligatorio'),
    alt_img:  yup.string(),
});

export function FormularioHeroe (props) {

  const { user } = useContext( AuthContext );

  const { heroeSeleccionado, onCambio, mostrarForm, scrollToTop } = props;
  const { register, handleSubmit, setValue, clearErrors, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const [ guardando, setGuardando ] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    if(heroeSeleccionado) {
        setValue('superhero', heroeSeleccionado.superhero, { shouldValidate: true });
        setValue('publisher', heroeSeleccionado.publisher, { shouldValidate: true });
        setValue('alter_ego',  heroeSeleccionado.alter_ego, { shouldValidate: true });
        setValue('first_appearance', heroeSeleccionado.first_appearance, { shouldValidate: true });
        setValue('characters', heroeSeleccionado.characters, { shouldValidate: true });
        setValue('habilities', heroeSeleccionado.habilities, { shouldValidate: true });
        setValue('alt_img', heroeSeleccionado.alt_img, { shouldValidate: true })
    };
  }, [heroeSeleccionado, setValue]);

  const resetForm = () => {
    setValue('superhero', null);
    setValue('publisher', null);
    setValue('alter_ego', null);
    setValue('first_appearance', null);
    setValue('characters', null);
    setValue('habilities', null);
    setValue('alt_img', null);
    clearErrors();
  };

  const limpiarForm =  () => {
    resetForm();
  };

  const enviar = (data) => {
    setGuardando(true)
    if (heroeSeleccionado) {
      axios.patch(`http://localhost:3001/heroes/${heroeSeleccionado.id}`, data)
      .then((_) => {
        toast('¡Héroe actualizado!');
        limpiarForm(); // Luego de actualizar el héroe, limpiamos el formulario.
        onCambio(heroeSeleccionado.id); // graficamos en pantalla los cambios.
        setGuardando(false);
        mostrarForm(false);
        scrollToTop();
      })
      .catch((error) => {
        console.log(error);
        simpleAlert('Ha ocurrido un error', error.response.data.errores, 'error');
      });
    } else {
      data.usuarioId = user.id;
      axios.post(`http://localhost:3001/heroes`, data)
      .then((_) => {
        toast('¡Héroe creado!');
        if(data.publisher == "Marvel Comics") {
          navigate('../marvel', {replace: true});
  
        } else {
          navigate('../dc', {replace: true});
        };
      })
      .catch((error) => {
        console.log(error);
        simpleAlert('Ha ocurrido un error', error.response.data.errores, 'error');
      });
    };
  };

  return (
    <div style={{paddingBottom: '20px'}} className='animate__animated animate__fadeIn'>
      <form onSubmit={ handleSubmit(enviar) }>
        {/* Super héroe */}
        <div className="mb-3">
          <label htmlFor="superhero" className="form-label">Super héroe</label>
          <input 
            type="text"  
            className={`form-control ${(errors.superhero) ? 'is-invalid' : ''} `}  
            id="superhero" 
            {...register("superhero")}
          />
          {errors.superhero && <small className={'text-danger'}>{errors.superhero.message}</small>}
        </div>
        {/* Editorial */}
        <div className="mb-3">
          <label htmlFor="publisher" className="form-label">Editorial</label>
          <select 
                className="form-select"
                id="publisher" 
                {...register("publisher")}
            >
                <option value="Marvel Comics">
                  Marvel Comics
                </option>
                <option value="DC Comics">
                  DC Comics
                </option>
            </select>
          {errors.publisher && <small className={'text-danger'}>{errors.publisher.message}</small>}
        </div>
        {/* Alter Ego */}
        <div className="mb-3">
          <label htmlFor="alter_ego" className="form-label">Alter Ego</label>
          <input 
            type="text" 
            className={`form-control ${(errors.alter_ego) ? 'is-invalid' : ''} `} 
            id="alter_ego" 
            {...register("alter_ego")} 
          />
          {errors.alter_ego && <small className={'text-danger'}>{errors.alter_ego.message}</small>}
        </div>
        {/* Primera aparición */}
        <div className="mb-3">
          <label htmlFor="first_appearance" className="form-label">Primera aparición</label>
          <input 
            type="text" 
            className="form-control" 
            id="first_appearance" 
            {...register("first_appearance")}
          />
        </div>
        {/* Personajes */}
        <div className="mb-3">
          <label htmlFor="characters" className="form-label">Personajes</label>
          <input 
            type="characters" 
            className="form-control"
            id="characters" 
            {...register("characters")}
          />
        </div>
        {/* Habilidades */}
        <div className="mb-3">
          <label htmlFor="habilities" className="form-label">Habilidades</label>
          <input 
            type="text"  
            className={`form-control ${(errors.habilities) ? 'is-invalid' : ''} `}  
            id="habilities" 
            {...register("habilities")}
          />
          {errors.habilities && <small className={'text-danger'}>{errors.habilities.message}</small>}
        </div>
        {/* Url foto */}
        <div className="mb-3">
          <label htmlFor="alt_img" className="form-label">Url foto</label>
          <input 
            type="text" 
            className="form-control"
            id="alt_img" 
            {...register("alt_img")}
          />
        </div>
        <button type="submit" className="btn btn-primary me-2" disabled={ !isValid }>
          <span className=' displayCenter'>
            <FontAwesomeIcon 
              icon={faFloppyDisk} 
              color="white"
              fontSize={20} 
              className='me-2' 
            />
            Guardar
            {guardando &&
              <div className="spinner-border text-light spinner-border-sm ms-2" role="status"></div>
            }
          </span>
        </button>
        <button 
          type="reset" 
          className="ms-1 btn btn-secondary" 
          onClick={ () => limpiarForm() }
        >
          <span className=' displayCenter'>
            <FontAwesomeIcon 
              icon={faBan} 
              color="white"
              fontSize={20} 
              className='me-2' 
            />
            Descartar
          </span>
        </button>
      </form>
    </div>
  );
};
