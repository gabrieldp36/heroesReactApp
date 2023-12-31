import React, { useEffect, useMemo, useState,  useRef  } from "react";
import { MaterialReactTable } from "material-react-table";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { confirmAlert, getComentariosTable, toast } from "../helpers";

let columnas = [];

const schema = yup.object().shape({
  descripcion: yup.string().required('El campo es obligatorio').max(130, 'El comentario no puede superar los 130 caracteres.'),
});

export const ComentariosTable = () => {

  // States
  const [mostrarTable, setMostrarTable ] = useState(false);
  const [comentarios, setComentarios ] = useState([]);
  const [ comentarioSelecionado, setComentarioSelccionado ] = useState(null);
  const [ mostrarForm, setMostrarForm ] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  // States-Icon
  const [overEnviar, setOverEnviar] = useState(false);


  // refs
  const bodyBottom = useRef();
  
  useEffect(() => {
   obtenerComentarios();
  }, []);

  // Formulario Comentarios.
  const { register, handleSubmit, setValue, clearErrors, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    mode:'all'
  });

  // Helpers
  const obtenerComentarios = () => {
    // setMostrarTable(false);
    getComentariosTable()
    .then( (comentarios) => {
      setComentarios(comentarios);
      setMostrarTable(true);
    })
    .catch( (error) => {
      console.error(error);
    });
  };
  
  const eliminarComentario = (comentario) => {
    confirmAlert(`Desea eliminar el comentario del usuario ${comentario.usuario.nombre}`, 'warning')
    .then( async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete('http://localhost:3001/comentarios/' + comentario.id);
          obtenerComentarios();
          toast('¡Comentario eliminado!');
        } catch (error) {
          console.error(error);
          simpleAlert('Ha ocurrido un error', error.response.data.error, 'error');
        };
      };
    });
  };

  const onEditar = (comentario) => {
    setMostrarForm(true);
    setValue("descripcion", comentario.descripcion);
    setComentarioSelccionado(comentario);
    scrollToBottom()
  };

  const resetForm = () => {
    setValue("descripcion", '');
    clearErrors();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      bodyBottom.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const enviarComentario = async (data) => {
    try {
      const { ...comentario } = data;
      comentario.usuarioId = comentarioSelecionado.usuarioId;
      comentario.heroeId = comentarioSelecionado.heroeId;
      await axios.patch('http://localhost:3001/comentarios/' + comentarioSelecionado.id, comentario);
      setComentarioSelccionado(null);
      setMostrarForm(false);
      setOverEnviar(false)
      obtenerComentarios();
      resetForm();
      toast('¡Comentario actualizado!');
    } catch (error) {
      console.log(error)
    };
  };

  columnas = useMemo(
    () => [
      {
        accessorKey: "usuario.nombre",
        header: "Usuario",
      },
      {
        accessorKey: "heroe.superhero",
        header: "Super Héroe",
      },
      {
        accessorKey: "descripcion",
        header: "Comentario",
      },
      {
        header: "Acciones",
        Cell: (data) => (
          <span  className="displayCenter" style={{gap: '8px'}}>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => onEditar(data.row.original)}
            >
              <span className=' displayCenter'>
                <FontAwesomeIcon 
                  icon={faPen} 
                  color="white" 
                  fontSize={15} 
                  className='me-2' 
                />
                Editar
              </span>
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => eliminarComentario(data.row.original)}
            >
              <span className=' displayCenter'>
                <FontAwesomeIcon 
                  icon={faTrashCan} 
                  color="white" 
                  fontSize={15} 
                  className='me-2' 
                />
                Eliminar
              </span>
            </button>
          </span>
        ),
      },
    ],
  );
  
  return (
    <div>      
      {
        !mostrarTable &&
        <div 
            style={{
                height:'100%', 
                width:'100%', 
                display:'grid',
                placeItems: 'center',
            }}
        >
            <div 
              className="spinner-border text-primary" 
              role="status"
              style={{width: '3rem', height: '3rem'}}
            ></div>
        </div>
      }
      { mostrarTable &&
        <div className="animate__animated animate__fadeIn animate__slow">
          <MaterialReactTable
            columns={columnas}
            data={comentarios}
            enableFullScreenToggle={false}
            muiTableBodyCellProps={{
              sx: {
                textAlign: "center",
              },
            }}
            muiTablePaginationProps={{
              rowsPerPageOptions: [5, 10, 20, 50],
            }}
            onPaginationChange={setPagination}
            state={{ pagination }}
          />
        </div>
      }
      <div ref={bodyBottom}></div>
      {mostrarForm && (
        <div className="container mb-3">
          <div className="row">
            <div className="col-lg-5 col-md-9 col-sm-12">
              <div>
                <h4 className="h2EliminarCuenta">Editar comentario</h4>
              </div>
              <form onSubmit={handleSubmit(enviarComentario)}>
                <div className="mb-3">
                  <textarea
                    type="descripcion"
                    className={`form-control textAreaComentarios ${
                      errors.descripcion ? "is-invalid" : ""
                    } `}
                    id="descripcion"
                    {...register("descripcion")}
                  />
                  {errors.descripcion && (
                    <small className={"text-danger"}>
                      {errors.descripcion.message}
                    </small>
                  )}
                </div>
                <div className="displayEnd">
                  <button
                    className="btn btn-outline-success mt-2"
                    type="submit"
                    disabled={!isValid}
                    onMouseOver={() =>  setOverEnviar(true)}
                    onMouseLeave={() =>  setOverEnviar(false)}
                  >
                    <FontAwesomeIcon 
                      icon={faPaperPlane} 
                      color={ (overEnviar) ? "white" : "#198754"}
                      fontSize={20} 
                      className='me-2' 
                    />
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
