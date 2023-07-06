import { FormularioHeroe } from "../components"

export const CreacionesPage = () => {
  return (
    <div>
      <h1>¡Crea tus propios héroes!</h1>
      <hr />
      <div className="row" style={{justifyContent: 'center', marginTop:'40px'}}>
        <div className="col-6">
          <FormularioHeroe />
        </div>
      </div>
    </div>
  )
}