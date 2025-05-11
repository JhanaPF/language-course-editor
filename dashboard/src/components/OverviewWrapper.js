import React from 'react'
import { Card, CardBody, CardSubtitle, CardTitle, CardText, CardGroup, Button, ButtonGroup, Row } from 'reactstrap'
import AddButton from './AddButton'

/**
 * @props children - wrap modal
 * @param {string} objName
 * @param {function} toggleModal
 * @param {mongoId} elemId
 * @param {JSX} children = modal
 * Modal is managed in Overwiews class components
 */
export default class OverviewWrapper extends React.Component { // Common component for all overviews
    constructor (props) {
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

    handleIndexChange (id, value) {
        console.log('update index', id, value)
    }

    setElement (id) {
        this.setState({ elemId: id })
    }

    render () {
        if (!this.props.elements) return null
        const elements = this.props.elemId ? this.props.elements.filter(elem => elem._id === this.props.elemId) : this.props.elements

        return (<Row>

            {!this.props.elemId && <AddButton className="ml-4" addFunction={this.props.toggleModal}>Ajouter {this.props.buttonObjName}</AddButton>}

            <Row className='mt-3 mx-5 w-100 justify-content-center'>
                {elements && elements.map((elem, i) =>
                    <Card key={i} style={{ width: '18rem' }}>
                        <CardBody>
                            <CardTitle tag="h5">{elem.name}</CardTitle>
                            <CardSubtitle className="mb-2 text-muted" tag="h6">{i}</CardSubtitle>
                            <CardText>{elem.description}</CardText>
                            <CardGroup>
                                <Button className="mx-auto" onClick={this.props.setElement.bind(this, elem._id)}>
                                    Modifier
                                </Button>
                            </CardGroup>
                            <ButtonGroup>
                                <Button onClick={this.handleIndexChange.bind(this, elem._id, -1)}>
                                    {'<'}
                                </Button>
                                <Button onClick={this.handleIndexChange.bind(this, elem._id, 1)}>
                                    {'>'}
                                </Button>
                            </ButtonGroup>
                        </CardBody>
                    </Card>
                )}
            </Row>

            {this.props.children}

        </Row>)
    }
}
