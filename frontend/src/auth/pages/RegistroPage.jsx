import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { simpleAlert } from '../../heroes/helpers/sweetAlert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

const schema = yup.object().shape({
  nombre: yup.string().required('El campo es obligatorio'),
  correo: yup.string().required('El campo es obligatorio').email('Ingrese un correo válido'),
  password: yup.string().required('El campo es obligatorio'),
});


export const RegistroPage = () => {

  const { login } = useContext( AuthContext );
  const navigate = useNavigate();

  // Formulario registro.
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const enviar = (data) => {
    axios.post('http://localhost:3001/usuarios', data)
    .then( (_) => {
      delete data.nombe;
      login(data);
    })
    .catch((error) => {
      console.log(error);
      simpleAlert('Ha ocurrido un error', error.response.data.errores, 'error');
    });
  };

  return (
    <div 
      style=
      {{
        width:'100vw', 
        height:'100vh', 
        display:'grid',
        placeItems: 'center',
        background: "url('/assets/bg-login.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div 
        className='animate__animated animate__fadeIn animate__slow'
        style={{
          backgroundColor: "white", 
          padding: '30px', 
          borderRadius:'8px', 
          boxShadow: '0px 0px 5px 6px rgba(0.21, 0.21, 0.21, 0.21), 0px 0px 5px 6px rgba(0.24, 0.24, 0.24, 0.24)',
        }}
      >
        <div>
            <div className='displayCenter'>
              <img src={"/assets/logo.png"} alt="" />
            </div>
        </div>
        <div style={{justifyContent: 'center', width: '360px'}}>
          <div>
            <form
              onSubmit={ handleSubmit(enviar) }  
              className="mt-5 ps-2 pe-2"
            > 
              {/* Nombre */}
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input 
                  type="text" 
                  className={`form-control ${(errors.nombre) ? 'is-invalid' : ''} `} 
                  id="nombre" 
                  {...register("nombre")} 
                />
                {errors.nombre && <small className={'text-danger'}>{errors.nombre.message}</small>}
              </div>
              {/* Correo */}
              <div className="mb-3">
                <label htmlFor="correo" className="form-label">Correo</label>
                <input 
                  type="email" 
                  className={`form-control ${(errors.correo) ? 'is-invalid' : ''} `} 
                  id="correo" 
                  {...register("correo")} 
                />
                {errors.correo && <small className={'text-danger'}>{errors.correo.message}</small>}
              </div>
              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input 
                  type="password" 
                  className={`form-control ${(errors.password) ? 'is-invalid' : ''} `} 
                  id="password" 
                  {...register("password")} 
                />
                {errors.password && <small className={'text-danger'}>{errors.password.message}</small>}
              </div>
              <div className='displayEnd mb-3' style={{fontWeight:'bold', color:'#7b1fa2'}}>
                <span className='spanLogin text-end' onClick={()=> navigate('/login')}>Iniciar sesión</span>
              </div>
              <button 
                type="submit" 
                className="w-100 btn btn-lg btn-primary" 
                disabled={!isValid}
              >
                <span className=' displayCenter' style={{gap: '16px'}}> 
                  <FontAwesomeIcon 
                    icon={faUserPlus} 
                    color="white"
                    fontSize={24}  
                  />
                  Registrarse
                </span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};