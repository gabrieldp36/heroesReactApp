import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'

const schema = yup.object().shape({
  correo: yup.string().required('El campo es obligatorio').email('Ingrese un correo válido'),
  password: yup.string().required('El campo es obligatorio'),
});


export const LoginPage = () => {

  const { login } = useContext( AuthContext );
  const navigate = useNavigate();

  // Formulario login.
  const { register, handleSubmit, setValue, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onLogin = (data) => {
    login(data);
  };

  useEffect(()=> {
    setValue("correo", "admin@gmail.com")
    setValue("password", "A56456a9")
  },[])

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
              onSubmit={ handleSubmit(onLogin) }  
              className="mt-5 ps-2 pe-2"
            >
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
                ¡<span className='spanLogin text-end' onClick={()=> navigate('/login/registro')}>Crear cuenta</span>!
              </div>
              <button 
                type="submit" 
                className="w-100 btn btn-lg btn-primary" 
                disabled={!isValid}
              >
                <span className=' displayCenter' style={{gap: '16px'}}> 
                  <FontAwesomeIcon 
                    icon={faRightToBracket} 
                    color="white"
                    fontSize={24}  
                  />
                  Acceder
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};