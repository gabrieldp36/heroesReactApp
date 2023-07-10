import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { deleteUsuarios, getUsuarios, reactivarUsuarios, selectPerfil, simpleAlert, toast } from "../helpers";

let columnas = [];

export const UsuariosTable = () => {
  
  const [mostrarTable, setMostrarTable ] = useState(false);
  const [users, setUsers ] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  
  useEffect(() => {
   obtenerUsuarios();
  }, []);

  const obtenerUsuarios = () => {
    // setMostrarTable(false)
    getUsuarios()
    .then( (usuarios) => {
      usuarios = usuarios.filter( (usuario) => usuario.admin === false);
      setUsers(usuarios);
      setMostrarTable(true)
    })
    .catch( (error) => {
      console.error(error);
    });
  };

  const bloquearUsuario = (id) => {
    deleteUsuarios(id)
    .then( (_) => {
      toast('¡Usuario bloqueado!');
      obtenerUsuarios();
    })
    .catch( (error) => {
      console.error(error);
      simpleAlert('Ha ocurrido un error', error.response.data.error, 'error');
    });
  };

  const activarUsuario = (id) => {
    reactivarUsuarios(id)
    .then( (_) => {
      toast('¡Usuario activado!');
      obtenerUsuarios();
    })
    .catch( (error) => {
      console.error(error);
      simpleAlert('Ha ocurrido un error', error.response.data.error, 'error');
    });
  };

  columnas = useMemo(
    () => [
      {
        header: "Foto",
        Cell: (data) => (
          <span className="displayCenter">
            <span
              className='imgUserTable animate__animated animate__fadeIn animate__slow'
              style={{ backgroundImage: `url(${selectPerfil(data.row.original)}` }}
            ></span>
          </span>
        ),
      },
      {
        accessorKey: "nombre",
        header: "Nombre",
      },
      {
        accessorKey: "correo",
        header: "Correo",
      },
      {
        accessorKey: "id",
        header: "Acciones",
        Cell: (data) => (
          <span>
            <button
              className="btn btn-primary btn-sm"
              disabled = {data.row.original.estado == true}
              onClick={() => activarUsuario(data.cell.getValue())}
            >
              Activar
            </button>
            <button
              className="btn btn-danger btn-sm ms-2"
              disabled = {data.row.original.estado == false}
              onClick={() => bloquearUsuario(data.cell.getValue())}
            >
              bloquear
            </button>
          </span>
        ),
      },
    ],
  );
  
  return (
    <>
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
        <MaterialReactTable
          columns={ columnas }
          data={users}
          muiTableBodyCellProps={{
            sx: {
              textAlign: "center"
            },
          }}
          muiTablePaginationProps={{
            rowsPerPageOptions: [5, 10, 20, 50],
          }}
          onPaginationChange={setPagination}
          state={{ pagination }}
        />
      }
    </>
  );
};
