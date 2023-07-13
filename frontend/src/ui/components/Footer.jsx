
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react';

export const FooterComponent = () => {

    const [overLinkedIn, setOverLinkedIn] = useState(false);
    const [overGithub, setOverGithub] = useState(false);
    const [overContacto, setOverContacto] = useState(false);
    
    return (
        <div style={{marginTop: '-50px'}}>
            <footer className="footerBG">
                <div className="divLogo">
                    <img src={"/assets/logoFooter.png"} className="footerLogo" />
                </div>
                <div className="container">
                    <div className="row divNavPills">
                        <div className="col-md-12">
                            <ul className="nav nav-pills nav-fill" style={{alignItems:"baseline"}}>
                                <li className="nav-item">
                                    <a
                                        className="nav-link anchorNavPillsFooter"
                                        href="https://www.linkedin.com/in/dominguezprado/"
                                        target="_blank"
                                        onMouseOver={() => setOverLinkedIn(true)}
                                        onMouseLeave={() => setOverLinkedIn(false)}
                                    >
                                        <FontAwesomeIcon 
                                            icon={faLinkedin} 
                                            color={ (overLinkedIn) ? "#69f0ae" : "white"}
                                            fontSize={28} 
                                            className='me-2' 
                                        />
                                        <span className="centrarIcon">LinkedIn</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link anchorNavPillsFooter"
                                        href="https://github.com/gabrieldp36"
                                        target="_blank"
                                        onMouseOver={() =>  setOverGithub(true)}
                                        onMouseLeave={() =>  setOverGithub(false)}
                                    >
                                        <FontAwesomeIcon 
                                            icon={faGithub} 
                                            color={ (overGithub) ? "#69f0ae" : "white"}
                                            fontSize={30} 
                                            className='me-2' 
                                        />
                                        <span className="centrarIcon">Github</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link anchorNavPillsFooter"
                                        href="mailto:gabrieldominguezprado@gmail.com?subject=Consulta Heroes App"
                                        onMouseOver={() =>  setOverContacto(true)}
                                        onMouseLeave={() => setOverContacto(false)}
                                    >
                                        <FontAwesomeIcon 
                                            icon={faEnvelope} 
                                            color={ (overContacto) ? "#69f0ae" : "white"}
                                            fontSize={25} 
                                            className='me-2' 
                                        />
                                        <span className="centrarIcon">Contacto</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <p className="nav-link derechosReservadosFooter">
                                        <span className="marginNombre">
                                        Gabriel Domínguez Prado
                                        </span>
                                        <i>© 2023 Todos los Derechos Reservados.</i>
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
      </div>
    );
};