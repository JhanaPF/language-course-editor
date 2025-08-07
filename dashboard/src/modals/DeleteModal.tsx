import React from 'react'
import { ModalBody, Button, Col } from 'reactstrap'
import MyModal from '../components/wrappers/MyModal'

/**
 *
 * @param {*} props: toggleModal, isOpen, closeModal, delete
 * @returns
 */
export default function DeleteModal (props) {
    return (
        <MyModal isOpen={props.isOpen} title="Ajouter une question" closeModal={props.closeModal} size="sm">
            <ModalBody>
                <Col className='text-center'>
                    <Button onClick={() => props.toggleModal('deleteModal')} >
                        Annuler
                    </Button>
                    {'  '}
                    <Button onClick={() => props.delete()} color='danger'>
                        Supprimer
                    </Button>
                </Col>
            </ModalBody>
        </MyModal>
    )
}
