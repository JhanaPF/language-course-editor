import { useCallback, useEffect, useState } from 'react';
import { get } from '../api/apiRequests'

/**
 * Overview parent classe
 * Call componentDidMount with super.onFetch(filter)
 * In render add OverviewWrapper with nested modal
 */

export default function Overview(objName, filter) {
    const [elements, setElements] = useState(null)
    const [elemId, setElemId] = useState(null)
    const [element, setElementState] = useState(null)
    const [modal, setModal] = useState(false)

    const onFetch = useCallback(() => {
        const initState = (fields = {}) => {
            setModal(false)
            setElements(fields.elements || null)
        }

        get(objName, filter,
            (res) => initState({ elements: res.data[objName] }),
            () => initState()
        )
    }, [objName, filter])

    useEffect(() => {
        onFetch()
    }, [onFetch])

    const toggleModal = () => setModal(prev => !prev)
    const closeModal = () => setModal(false)
    const openModal = () => setModal(true)

    const closeModalAfterRequest = () => {
        onFetch()
    }

    const setElement = (id) => {
        const el = elements?.find(e => e._id === id)
        setElemId(id)
        setElementState(el || null)
    }

    const getElement = (id) => elements?.find(e => e._id === id)

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
        getElement
    }
}

