import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../../auth/context/AuthContext';
import { HeroCard } from './';
import { getHeroesByPublisher } from '../helpers';

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
        <div className="row minHeight">
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
                    <div className='row'>
                        <div className='col-lg-6 col-md-8 col-xs-12'>
                            <div className="alert alert-info animate__animated animate__flipInX" >
                                No tenés héroes creados ¡Crea uno, hace click en el botón!
                            </div>
                            <button 
                                className="btn btn-info"
                                onClick={ () => navigate('../creaciones', {replace: true})}
                            >
                                <span className='displayCenter'>
                                    <FontAwesomeIcon 
                                        icon={faPen} 
                                        color= "black"
                                        fontSize={20} 
                                        className='me-2' 
                                    />
                                    ¡Crear héroe!
                                </span>
                            </button>
                        </div>    
                    </div>
                </div>
            }
        </div>
    );
};
