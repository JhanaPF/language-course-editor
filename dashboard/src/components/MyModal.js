import React from "react";
import {Modal} from 'reactstrap';

export class MyModal extends React.Component {
    constructor(props){
        super(props);
    }

    handleChange = (event) => {
        const {name, value} = event.currentTarget;
        this.setState({ [name] : value });
    }

    render(){
        return (
            <Modal>
                {this.props.children}
            </Modal>
        )
    }
}