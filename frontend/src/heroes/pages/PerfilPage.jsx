import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { confirmAlert, simpleAlert, toast } from '../../heroes/helpers/sweetAlert';
import { AuthContext } from "../../auth/context/AuthContext";
import { selectPerfil } from "../helpers";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  nombre: yup.string().required('El campo es obligatorio'),
  correo: yup.string().required('El campo es obligatorio').email('Ingrese un correo válido'),
  password: yup.string(),
  url_foto: yup.string(),
});

export const PerfilPage = () => {

    const { user, logout, checkToken } = useContext( AuthContext );
    const navigate = useNavigate();

    // Formulario edición perfil.
    const { register, handleSubmit, setValue, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
        mode: 'all',
    });

    useEffect(()=> {
        if(user) {
            setValue("nombre", user.nombre);
            setValue("correo", user.correo);
            setValue("password", user.password);
            setValue("url_foto", user.url_foto);
        };
    },[])

    const enviar = (data) => {
        axios.patch(`http://localhost:3001/usuarios/${user.id}`, data)
        .then( (_) => {
            toast('¡Perfil actualizado!');
            checkToken();
            navigate('/marvel');
        })
        .catch((error) => {
          console.log(error);
          simpleAlert('Ha ocurrido un error', error.response.data.errores, 'error');
        });
    };

    const eliminarCuenta = (id) => {
        confirmAlert(`Está a punto de eliminar su cuenta.`, 'warning')
        .then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3001/usuarios/${user.id}`)
                .then( (_) => {
                    logout();
                })
                .catch( (error) => {
                    console.error(error);
                    simpleAlert('Ha ocurrido un error', error.response.data.error, 'error');
                });
            };
        });
    };

    return (
        <div>
            <div className="container animate__animated animate__fadeIn animate__slow">
                <div className="encabezadoPerfilUsuario">
                <div className="divInfoUsario">
                    <div className="divUserIMG">
                    <div
                        style={{ backgroundImage: `url(${selectPerfil(user)})` }}
                        className="userIMG"
                    />
                    </div>
                    <div>
                    <h1 className="nombrePerfil mb-2">{user.nombre}</h1>
                    <p className="textoFechaIngreso">¡Bienvenido a tu perfil!</p>
                    </div>
                </div>
                </div>
            </div>
            <div className="animate__animated animate__fadeIn animate__slow">
                <form onSubmit={ handleSubmit(enviar)}>
                    <div className="row" style={{justifyContent:'center', marginTop: '20px', paddingBottom:'30px'}}>
                        <div className="col-lg-5 col-md-9 col-sm-12">
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
                                className="form-control" 
                                id="password" 
                                {...register("password")} 
                                />
                                <span className="spanInfo">
                                    La contraseña debe contener mínimo 8 caractéres, 
                                    al menos una letra mayúscula, una letra minúscula y un número.
                                </span>
                            </div>
                            {/* Url_foto*/}
                            <div className="mb-3">
                                <label htmlFor="url_foto" className="form-label">Url foto</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="url_foto" 
                                {...register("url_foto")} 
                                />
                            </div>
                            <button type="submit" className="w-100 btn btn-lg btn-primary mt-2" disabled={!isValid}>
                                Actualizar perfil
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="row" style={{justifyContent: 'center', marginBottom: '70px'}}>
                <div className="col-lg-5 col-md-9 col-sm-12">
                    <hr />
                    <div>
                        <h2 className="h2EliminarCuenta">Eliminar cuenta</h2>
                        <p className="font15">
                            <strong className="spanError">¡Atención!</strong>
                            Si eliminas tu cuenta, ya no podrás iniciar sesión con ella. Ante cualquier
                            inquietud consulta con un administrador.
                        </p>
                        <div className="divBTNEliminarCuenta text-center" style={{marginTop:'35px'}}>
                            <button 
                                className="btn btn-danger" 
                                type="button"
                                onClick={eliminarCuenta}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};