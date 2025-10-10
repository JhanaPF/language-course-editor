import { useState } from 'react';
import { Row } from 'reactstrap';
import AddButton from '../buttons/AddButton';
import ClickableCard, { CardType } from '../../components/cards/ClickableCard';

type OverviewWrapperProps = {
    toggleModal: any;
    elemId: any;
    children?: React.ReactNode;
    buttonObjName: any;
    elements: any;
    setElement: any;
    objName: CardType;
};

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
const OverviewWrapper: React.FC<OverviewWrapperProps> = ({
    toggleModal,
    elemId,
    children,
    buttonObjName,
    elements,
    setElement,
    objName,
}) => {

    //const handleIndexChange = (id, value) => {
    //    console.log('update index', id, value)
    //}

    const filteredElements = elemId
        ? elements?.filter((elem: any) => elem._id === elemId)
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
                {filteredElements.map((elem: any, i: number) => (
                    <ClickableCard
                        key={i}
                        type={objName}
                        item={elem}
                        onClick={() => setElement(elem)}
                    />
                ))}
            </Row>

            {children}
        </Row>
    )
}

export default OverviewWrapper;