import { useState } from 'react';
import { Row } from 'reactstrap'
import AddButton from '../buttons/AddButton'
import ClickableCard from '../../components/cards/ClickableCard'


/**
 * @param {string} props.objName
 * @param {function} props.toggleModal
 * @param {string} props.elemId
 * @param {JSX.Element} props.children
 * @param {string} props.buttonObjName
 * @param {array} props.elements
 */
export default function OverviewWrapper({
    toggleModal,
    elemId,
    children,
    buttonObjName,
    elements
}) {
    if (elemId) {
        console.warn('Elem id is missing, you will not be able to add an element');
    }

    const [localElemId, setLocalElemId] = useState(null);

    //const handleIndexChange = (id, value) => {
    //    console.log('update index', id, value)
    //}

    const setElement = (id) => {
        setLocalElemId(id);
        // Si le parent veut être notifié, il faut passer un callback prop
    }

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
                        onClick={() => setElement(elem._id)}
                    />
                ))}
            </Row>

            {children}
        </Row>
    )
}