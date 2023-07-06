import React, { useEffect, useState } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { selectImgComentario, toast } from '../helpers';
import { useRef } from 'react';

const schema = yup.object().shape({
    descripcion: yup.string().required('El campo es obligatorio').max(130, 'El comentario no puede superar los 130 caracteres.'),
});
  
export const Comentarios = (props) => {
   
    // Elimanos de las props el usuarioAuth y el héroe para que funcione el modal.
    const { usuarioAuth, heroeId, heroeNombre, ...propsModal } = props;
    props = propsModal;

    // States.
    const [ listaComentarios, setListaComentarios ] = useState([]);
    const [ comentarioSelecionado, setComentarioSelccionado ] = useState(null);
    const [ cargandoComentarios, setCargandoComentarios ] = useState(false);
    const [ mostrarForm, setMostrarForm ] = useState(false);

    // refs
    const bodyTop = useRef();
    const bodyBottom = useRef();
   
    // Cuando se carga el modal, mostramos la lista de comentarios.
    useEffect(()=> {
        renderizarComentrarios(heroeId);
    },[ heroeId ]);

    // Formulario invitados.
    const { register, handleSubmit, setValue, clearErrors, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
        mode:'all'
    });

    // Peticiones http.
    const renderizarComentrarios = (heroeId) => {
        setCargandoComentarios(true);
        axios.get('http://localhost:3001/comentarios/heroe/' + heroeId)
        .then( (response) => {
            setListaComentarios(response.data);
            setCargandoComentarios(false);
        }).catch( (error) => {
            console.log(error)
        });
    };

    const enviarComentario = async (data) => {
        try {
            if(comentarioSelecionado) {
                const { ...comentario } = data;
                comentario.usuarioId = usuarioAuth.id;
                comentario.heroeId = heroeId;
                await axios.patch('http://localhost:3001/comentarios/' + comentarioSelecionado.id, comentario);
                setComentarioSelccionado(null);
                setMostrarForm(!mostrarForm);
                renderizarComentrarios(heroeId);
                resetForm();
                scrollToTop();
                toast('¡Comentario actualizado!');
            } else {
                const { ...comentario } = data;
                comentario.usuarioId = usuarioAuth.id;
                comentario.heroeId = heroeId;
                await axios.post('http://localhost:3001/comentarios', comentario);
                setMostrarForm(!mostrarForm);
                renderizarComentrarios(heroeId);
                resetForm();
                scrollToTop();
                toast('¡Comentario posteado!');
            }
        } catch (error) {
            console.log(error)
        };
    };

    const onEditar = (comentario) => {
        setMostrarForm(!mostrarForm);
        setValue("descripcion", comentario.descripcion);
        setComentarioSelccionado(comentario);
        scrollToBottom();
    };

    const borrarComentario = async (id) => {
        try {
            await axios.delete('http://localhost:3001/comentarios/' + id);
            renderizarComentrarios(heroeId);
            toast('¡Comentario eliminado!');
        } catch (error) {
            console.log(error);
        };
    };

    // Helpers
    const restringirAcciones = (comentario) => {
        if(usuarioAuth.admin || comentario.usuario.id == usuarioAuth.id) {
            return <>
                <img 
                    src={'/assets/edit.svg'}  
                    className='iconComentarios' 
                    alt="" 
                    onClick={() => onEditar(comentario)}
                />
                <img 
                    src={'/assets/delete.svg'}  
                    className='iconComentarios' 
                    alt="" 
                    onClick={() => borrarComentario(comentario.id)}
                />
            </>
        };
        return <></>;
    };

    const resetForm = () => {
        setValue("descripcion", '');
        clearErrors();
    };

    const scrollToTop = () => {
        setTimeout(() => {
            bodyTop.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const scrollToBottom = () => {
        setTimeout(() => {
            bodyBottom.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop='static'
            scrollable='true'
            centered
            style={{minHeight: '573px !important'}}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Listado de comentarios
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    cargandoComentarios === 0 &&
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
                <div className='divListaComentarios'>
                    <div ref={bodyTop}></div>
                    {   listaComentarios.map( (comentario, index) => { 
                
                            return (
                                <div key={ index } className='mb-2'>
                                    <div className="animate__animated animate__zoomIn">
                                        <div className="divInfoComentario">
                                            <div className="divUserIMG">
                                                <div
                                                    style={{ backgroundImage: `url(${selectImgComentario(comentario.usuario.url_foto)})` }}
                                                    className="userIMGComentario"
                                                ></div>
                                            </div>
                                            <div className='divComentario' style={{marginTop: '38px'}}>
                                                <h4 className="nombreComentario">{comentario.usuario.nombre}</h4>
                                                <p className="textoFechaIngreso">{comentario.descripcion}</p>
                                                <div className='divBtnsComentarios'>
                                                    { restringirAcciones(comentario) }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        listaComentarios.length ===0 &&
                        <div className='row' style={{margin:0, justifyContent: 'center'}}>
                            <div className='col-lg-7 col-md-8 col-xs-12'>
                                <div className="alert alert-info animate__animated animate__flipInX" >
                                    Sé el primero, ¡Deja un comentario!
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <button 
                    className='btn btn-outline-info' 
                    onClick={ () => setMostrarForm(!mostrarForm)}
                >¡Comentar!</button>
                { mostrarForm &&
                    <div className='container mb-3'>
                        <div className="row">
                            <div className="col-lg-5 col-md-9 col-sm-12">
                                <div>
                                    <h2 className="h2EliminarCuenta">Agregar comentario</h2>
                                    <p className="font15">
                                        Agregue un comentario sobre {heroeNombre}
                                    </p>
                                </div>
                                <div ref={bodyBottom}></div>
                                <form onSubmit={ handleSubmit(enviarComentario) }  >
                                    <div className="mb-3">
                                        < textarea
                                            type="descripcion" 
                                            className={`form-control textAreaComentarios ${(errors.descripcion) ? 'is-invalid' : ''} `} 
                                            id="descripcion" 
                                            {...register("descripcion")} 
                                        />
                                        {errors.descripcion && <small className={'text-danger'}>{errors.descripcion.message}</small>}
                                    </div>
                                    <div className='displayEnd'>
                                        <button 
                                            className="btn btn-outline-success mt-2"
                                            type="submit"
                                            disabled={!isValid}
                                        >
                                            Enviar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
}