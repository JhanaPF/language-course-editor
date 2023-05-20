import React from "react";
import {Modal, Row, Col} from 'reactstrap';

/**
 * Wrap your modal body
 * @param openProp
 * @param size - default = "lg"
 * @param title
 * @param closeModal
 */
export default class MyModal extends React.Component {
    // Wrapper for modals

    constructor(props){
        super(props);
        this.openProp = typeof props.isOpen === "boolean";
    }

    handleChange = (event) => {
        const {name, value} = event.currentTarget;
        this.setState({ [name] : value });
    }

    render(){
        return (
            <Modal isOpen={this.openProp ? this.props.isOpen : true} size={this.props.size ? this.props.size : 'lg'}>
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