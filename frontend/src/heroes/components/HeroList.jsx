import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroCard } from './';
import { getHeroesByPublisher } from '../helpers';
import { useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';

export const HeroList = ({ publisher }) => {

    const { user } = useContext( AuthContext );

    const [ heroes, setHeroes ] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getHeroesByPublisher( publisher, user )
        .then( (heroes) => {
            setHeroes(heroes);
        })
        .catch( (error) => {
            console.error(error);
        });
    }, []);

    return (
        <div className="row">
            { (heroes && heroes.length > 0) &&
                heroes.map( hero => (
                    <div className='col-lg-6 col-md-8 col-xs-12' key={ hero.id } >
                        < HeroCard 
                            { ...hero }
                        />
                    </div>
                ))
            }
            {
                ( heroes && heroes.length === 0 && !publisher) &&
                <div>
                    <div className="alert alert-danger animate__animated animate__fadeIn" >
                        No tenés héroes creados ¡Crea uno, hace click en el botón!
                    </div>
                    <button 
                       className="btn btn-info ms-2"
                       onClick={ () => navigate('../creaciones', {replace: true})}
                    >
                       ¡Crear héroe!
                    </button>
                </div>    
            }
        </div>
    );
};
