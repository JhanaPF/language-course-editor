import React, { ReactNode } from 'react';
import { Modal, Row, Col } from 'reactstrap';

interface MyModalProps {
    isOpen?: boolean;               // Indique si le modal est ouvert
    size?: 'sm' | 'md' | 'lg' | 'xl'; // Taille du modal (reactstrap)
    title: string;                  // Titre du modal
    closeModal: () => void;         // Fonction pour fermer le modal
    children?: ReactNode;           // Contenu du modal
}

interface MyModalState {
    [key: string]: any;             // Pour handleChange, état dynamique
}

export default class MyModal extends React.Component<MyModalProps, MyModalState> {
    private openProp: boolean;

    constructor(props: MyModalProps) {
        super(props);
        this.openProp = typeof props.isOpen === 'boolean';
        this.state = {};
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value });
    }

    render() {
        const { isOpen, size = 'lg', title, closeModal, children } = this.props;

        return (
            <Modal isOpen={this.openProp ? isOpen : true} size={size}>
                <Row className='p-3'>
                    <Col className="border-bottom" md='10'>
                        <p style={{ fontSize: 28 }}>{title}</p>
                    </Col>
                    <Col className='text-right ml-auto border-bottom'>
                        <button
                            onClick={closeModal}
                            type="button"
                            className="btn btn-outline-secondary text-right ml-auto"
                        >
                            X
                        </button>
                    </Col>
                </Row>

                {children}
            </Modal>
        );
    }
}
