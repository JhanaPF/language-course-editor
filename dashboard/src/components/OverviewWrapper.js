import React from 'react'
import { Card, CardBody, CardSubtitle, CardTitle, CardText, Row } from 'reactstrap'
import AddButton from './AddButton'
import ClickableCard from '../components/cards/ClickableCard'


/**
 * @props children - wrap modal
 * @param {string} objName
 * @param {function} toggleModal
 * @param {mongoId} elemId
 * @param {JSX} children = modal
 * Modal is managed in Overwiews class components
 */
export default class OverviewWrapper extends React.Component { // Common component for all overviews
    constructor(props) {
        if (props.elemId) console.warn('Elem id is missing, you will not be able to add an element')
        super(props)

        this.objName = this.props.objName
        this.state = {
            elemId: null
        }
    }

    handleSelectChange = (param, e) => {
        this.setState({ [param]: e })
    }

    handleIndexChange(id, value) {
        console.log('update index', id, value)
    }

    setElement(id) {
        this.setState({ elemId: id })
    }

    render() {
        if (!this.props.elements) return null
        const elements = this.props.elemId ? this.props.elements.filter(elem => elem._id === this.props.elemId) : this.props.elements

        return (<Row className='w-100'>

            {!this.props.elemId && (
                <AddButton className="mx-auto mt-5" addFunction={this.props.toggleModal}>
                    Ajouter {this.props.buttonObjName}
                </AddButton>
            )}

            <Row className='mt-3 w-100 justify-content-center'>
                {elements && elements.map((elem, i) =>
                    <ClickableCard key={i} type="" item={elem} onClick={this.setElement.bind(this)}/>
                )}
            </Row>

            {this.props.children}

        </Row>)
    }
}
