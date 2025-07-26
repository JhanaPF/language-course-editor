import { useState } from 'react';
import { Row } from 'reactstrap'
import AddButton from '../buttons/AddButton'
import ClickableCard from '../../components/cards/ClickableCard'


/**
 * @description Elements list, add button to toggle form modal and will manage also order of elements
 * @param {string} props.objName
 * @param {function} props.toggleModal
 * @param {string} props.elemId
 * @param {JSX.Element} props.children
 * @param {string} props.buttonObjName
 * @param {array} props.elements
 * @param {Function} setElement
 */
export default function OverviewWrapper({
    toggleModal,
    elemId,
    children,
    buttonObjName,
    elements,
    setElement
}) {

    //const handleIndexChange = (id, value) => {
    //    console.log('update index', id, value)
    //}

    const filteredElements = elemId
        ? elements?.filter(elem => elem._id === elemId)
        : elements;

    if (!elements) return null;

    return (
        <Row className='w-100'>
            {!elemId && (
                <AddButton className="mx-auto mt-5" addFunction={toggleModal}>
                    Ajouter {buttonObjName}
                </AddButton>
            )}

            <Row className='clickable-card-group'>
                {filteredElements.map((elem, i) => (
                    <ClickableCard
                        key={i}
                        type=""
                        item={elem}
                        onClick={() => setElement(elem)}
                    />
                ))}
            </Row>

            {children}
        </Row>
    )
}