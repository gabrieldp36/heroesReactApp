import { ComentariosTable, HeroesTable, UsuariosTable } from "../components";

export const AdminPage = () => {
    return (
      <div style={{marginBottom:"50px"}}>
        <h1>Panel de administrador</h1>
        <hr />
        <div style={{paddingTop: "30px"}}>
          <h3 style={{marginBottom: "20px"}}>Usuarios del sistema</h3>
          <UsuariosTable/>
        </div>
        <div style={{paddingTop: "50px"}}>
          <h3 style={{marginBottom: "20px"}}>Héroes registrados</h3>
          <HeroesTable/>
        </div>
        <div style={{paddingTop: "50px"}}>
          <h3 style={{marginBottom: "20px"}}>Comentarios registrados</h3>
          <ComentariosTable/>
        </div>
      </div>
    )
}