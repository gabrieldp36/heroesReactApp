import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FormularioHeroe } from './HeroEdicion';

export const ModalEditarHeroes = (props) => {
    const { heroeSelect, onCambioEdit, ...propsModal } = props;
    props = propsModal;
    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                scrollable="true"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Editar héroe
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="displayCenter">
                        <div className="col-lg-8 col-md-10 col-xs-12">
                            <div
                                style={{ marginTop: "20px" }}
                                className="animate__animated animate__zoomIn animate__fast"
                                >
                                <FormularioHeroe
                                    heroeSeleccionado={heroeSelect}
                                    onCambio={onCambioEdit}
                                    onHide =  { props.onHide }
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>
                        <span className=" displayCenter">
                            <FontAwesomeIcon
                                icon={faXmark}
                                color="white"
                                fontSize={20}
                                className="me-2"
                            />
                            Cerrar
                        </span>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>   
    );
};
