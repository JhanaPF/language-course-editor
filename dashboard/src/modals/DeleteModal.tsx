import React from 'react'
import { ModalBody, Button, Col } from 'reactstrap'
import MyModal from '../components/wrappers/MyModal'

type DeleteModalProps = {
    toggleModal: (modalName: string) => void;
    isOpen: boolean;
    closeModal: () => void;
    onDelete: () => void; // ← au lieu de "delete"
};

export default function DeleteModal({
    toggleModal,
    isOpen,
    closeModal,
    onDelete,
}: DeleteModalProps) {
    return (
        <MyModal isOpen={isOpen} title="Ajouter une question" closeModal={closeModal} size="sm">
            <ModalBody>
                <Col className='text-center'>
                    <Button onClick={() => toggleModal('deleteModal')} >
                        Annuler
                    </Button>
                    {'  '}
                    <Button onClick={() => onDelete()} color='danger'>
                        Supprimer
                    </Button>
                </Col>
            </ModalBody>
        </MyModal>
    );
}
