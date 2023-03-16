import React from "react";
import {Button, Row, Col, Modal} from 'reactstrap';



export function MyModal(props) {


    const type = props.addModal ? 'addModal' : 'editModal';


    return (
        <Modal isOpen size='lg' style={{ overflowY: 'auto'}}>
            <ModalBody>
                <Row className='border-bottom pb-3'>
                    <Col md='10'>
                        <h4>
                            {props.title}                 
                        </h4>
                    </Col>
                    <Col className='text-right ml-auto'>
                        <button onClick={props.closeModal} type="button" className="btn btn-outline-secondary text-right ml-auto">X</button>
                    </Col>                        
                </Row>
                {props.children}
            </ModalBody>
        </Modal>
    );
}