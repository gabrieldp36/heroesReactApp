import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { confirmAlert, deleteHeroe, getHeroesTable, selectImg, toast } from "../helpers";

let columnas = [];

export const HeroesTable = () => {
  
  const [mostrarTable, setMostrarTable ] = useState(false);
  const [heroes, setHeroes ] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  
  useEffect(() => {
   obtenerHeroes();
  }, []);

  const obtenerHeroes = () => {
    // setMostrarTable(false);
    getHeroesTable()
    .then( (heroes) => {
      setHeroes(heroes);
      setMostrarTable(true);
    })
    .catch( (error) => {
      console.error(error);
    });
  };

  const eliminarHeroe = (heroe) => {
    confirmAlert(`Desea eliminar a ${heroe.superhero}`, 'warning')
    .then((result) => {
      if (result.isConfirmed) {
        deleteHeroe(heroe.id)
        .then( (_) => {
          obtenerHeroes();
          toast('¡Héroe eliminado!');
        })
        .catch( (error) => {
          console.error(error);
          simpleAlert('Ha ocurrido un error', error.response.data.error, 'error');
        });
      };
    });
  };

  columnas = useMemo(
    () => [
      {
        header: "Foto",
        Cell: (data) => (
          <span className="displayCenter">
            <span
              className='heroAvatarTable animate__animated animate__fadeIn animate__slow'
              style={{ backgroundImage: `url(${selectImg(data.row.original)}` }}
            ></span>
          </span>
        ),
      },
      {
        accessorKey: "superhero",
        header: "Super Héroe",
      },
      {
        accessorKey: "alter_ego",
        header: "Alter Ego",
      },
      {
        accessorKey: "publisher",
        header: "Editorial",
      },
      {
        header: "Acciones",
        Cell: (data) => (
          <span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => eliminarHeroe(data.row.original)}
            >
              Eliminar
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
      {
        mostrarTable &&
        <MaterialReactTable
          columns={ columnas }
          data={ heroes }
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