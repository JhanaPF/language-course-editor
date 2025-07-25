import { useEffect, useState } from 'react';
import { get } from '../api/apiRequests'

/**
 * @description overview hook to manage data
 * @param {String} objName 
 * @param {Object} filter {key: id} for example 
 */
export default function useOverview(objName, filter) {
    const [elements, setElements] = useState(null);
    const [elemId, setElemId] = useState(null);
    const [element, setElementState] = useState(null);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        onFetch();
    }, [objName, JSON.stringify(filter)])

    const onFetch = () => {
        const initState = (fields = {}) => {
            setModal(false);
            setElements(fields.elements || null);
        }

        get(objName, filter,
            (res) => initState({ elements: res.data[objName] }),
            () => initState()
        )
    }

    const toggleModal = () => setModal(prev => !prev);
    const closeModal = () => setModal(false);
    const openModal = () => setModal(true);

    const closeModalAfterRequest = () => {
        onFetch();
    }

    const setElement = (id) => {
        const el = elements?.find(e => e._id === id);
        setElemId(id);
        setElementState(el || null);
    }

    const getElement = (id) => elements?.find(e => e._id === id);

    return {
        elements,
        elemId,
        element,
        modal,
        toggleModal,
        closeModal,
        openModal,
        closeModalAfterRequest,
        setElement,
        getElement,
        onFetch
    }
}