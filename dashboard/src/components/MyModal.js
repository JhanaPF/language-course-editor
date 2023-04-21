import React from "react";
import {Modal, ModalHeader, Row, Col} from 'reactstrap';

export default class MyModal extends React.Component {
    // Wrapper for modals

    constructor(props){
        super(props);
    }

    handleChange = (event) => {
        const {name, value} = event.currentTarget;
        this.setState({ [name] : value });
    }

    render(){
        return (
            <Modal isOpen={this.props.isOpen ? this.props.isOpen : true} size='lg'>
                <Row className='p-3'>
                    <Col className="border-bottom" md='10'>
                        <p style={{fontSize: 28}}>{this.props.title}</p>
                    </Col>
                    <Col className='text-right ml-auto border-bottom'>
                        <button onClick={this.props.closeModal} type="button" className="btn btn-outline-secondary text-right ml-auto">X</button>
                    </Col>                        
                </Row>

                {this.props.children}
            </Modal>
        )
    }
}