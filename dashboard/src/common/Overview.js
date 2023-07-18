import React from "react";
import { get } from '../apiRequests';

/**
 * Call componentDidMount with super.onFetch(filter)
 * In render add OverviewWrapper with nested modal
 */
export default class Overview extends React.Component {
    // parent class for all overviews views

    constructor(props, filter, objName) {
        super(props);
        this.state = {
            elements: null,
            elemId: null,
            modal: false
        };
        this.filter = filter;
        this.objName = objName;
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.closeModalAfterRequest = this.closeModalAfterRequest.bind(this);
        this.setElement = this.setElement.bind(this);
        this.getElement = this.getElement.bind(this);
    }

    componentDidMount() {
        this.onFetch();
    }

    onFetch() {
        var initState = (fields) => { this.setState({ loading: false, modal: false, ...fields }) };
        get(this.objName, this.filter, (res) => initState({ elements: res.data[this.objName] }), () => initState());
    }

    toggleModal = () => this.setState({ modal: !this.state.modal });

    closeModalAfterRequest() {
        this.onFetch();
    }

    closeModal() {
        this.setState({ modal: false });
    }

    openModal() {
        this.setState({ modal: true });
    }

    setElement(id) {
        this.setState({
            elemId: id,
            element: this.getElement(id)
        });
    }

    getElement(id) {
        return this.state.elements.find(e => e._id === id);
    }
}