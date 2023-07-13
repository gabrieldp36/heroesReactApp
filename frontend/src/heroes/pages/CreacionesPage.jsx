import { FormularioHeroe } from "../components"

export const CreacionesPage = () => {
  return (
    <div>
      <h1>¡Crea tus propios héroes!</h1>
      <hr />
      <div className="row" style={{justifyContent: 'center', marginTop:'40px'}}>
        <div className="col-lg-6 col-md-8 col-xs-12">
          <FormularioHeroe />
        </div>
      </div>
    </div>
  );
};