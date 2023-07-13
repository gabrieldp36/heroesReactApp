import { Link, useLocation } from 'react-router-dom';
import { selectImg } from '../helpers';
import { useEffect, useState } from 'react';
import { useRef } from 'react';

const CharactersByHero = ({ alter_ego, characters}) => {
    return ( alter_ego === characters )
     ? <></>
     : <p>{ characters }</p>;
};

export const HeroCard = (heroe) => {

    const [mostrarImg, setMostrarImg] = useState(false);
    const imgRef =  useRef();
    const location = useLocation();

    useEffect(() => {
        if (imgRef.current?.complete) {
            onLoad();
        }
    }, []);
    
    const onLoad = () => {
        setMostrarImg(true);
    };

    const selectAnimation = () => {
        if(location.pathname == '/search') {
            return 'animate__animated animate__fadeIn animate__slow'
        } else {
            return 'animate__animated animate__fadeInLeft'
        };
    };

    const guardarRuta = () => {
        localStorage.setItem('lastPath', location.pathname);
    };

    return (
        <div className={`col ${selectAnimation()} mb-4`}>
            <div className="card">

                <div className="row no-gutters">
                    
                    <div className="col-4">
                        {
                            !mostrarImg &&
                            <div 
                                style={{
                                    height:'100%', 
                                    width:'100%', 
                                    display:'grid',
                                    placeItems: 'center',
                                }}
                            >
                                <div className="spinner-border text-primary" role="status"></div>
                            </div>
                        }
                        <img 
                            ref={imgRef}
                            src={selectImg(heroe) } 
                            className="card-img" 
                            alt={ heroe.superhero } 
                            onLoad={ onLoad }
                            decoding='async'
                        />
                    </div>

                    <div className="col-8">

                        <div className="card-body">

                            <h5 className="card-title">{ heroe.superhero }</h5>
                            <p className="card-text">{ heroe.alter_ego }</p>

                            <CharactersByHero characters={ heroe.characters } alter_ego={ heroe.alter_ego } />

                            <p className="card-text">
                                <small className="text-muted">{ heroe.first_appearance }</small>
                            </p>

                            <Link
                                onClick={ () => guardarRuta() } 
                                to={`/hero/${ heroe.id }`} 
                                style={{textDecoration:'none'}}
                            >
                                <img src={'/assets/iconTarjetaHeroe.svg'} className='tarjetaIcon' alt="" />
                                <span className='spanIconTarjeta ms-2'>Ver mas</span>
                            </Link>    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
