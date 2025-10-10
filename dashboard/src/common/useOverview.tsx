import { useEffect, useState } from 'react';
import { get } from '../api/apiRequests';

interface Element {
    _id: string;
}

type Filter = {
    [rootKey: string]: Record<string, string | number | undefined>;
};

/**
 * @description overview hook to manage data
 * @param {String} objName 
 * @param {Object} filter {key: id} for example 
 */
export default function useOverview(objName: string, filter: Filter) {
    const [elements, setElements] = useState<Element[] | null>(null);
    const [elemId, setElemId] = useState<string | null>(null);
    const [element, setElementState] = useState<object>();
    const [modal, setModal] = useState(false);

    useEffect(() => {
        onFetch();
    }, [objName, JSON.stringify(filter), elemId]);

    const onFetch = () => {
        console.log("Fetching elements");

        const initState = (fields = {}) => {
            setModal(false);
            // @ts-expect-error: fields est un objet dynamique sans typage strict
            setElements(fields.elements || null);
        };

        get(objName, filter,
            (res) => initState({ elements: res.data[objName] }),
            () => initState()
        );
    };

    const toggleModal = () => setModal(prev => !prev);
    const closeModal = () => setModal(false);
    const openModal = () => setModal(true);

    const closeModalAfterRequest = () => {
        onFetch();
    };

    const setElement = (id: string) => {
        const elem = elements?.find(e => e._id === id);
        setElemId(id);
        setElementState(elem);
    };

    const getElement = <T extends { _id: string }>(id: string | null, elements?: T[] | null) => {
        elements?.find(e => e._id === id);
    };

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
    };
}