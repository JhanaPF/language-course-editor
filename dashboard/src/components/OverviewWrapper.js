import React from 'react';
import {Card, CardBody, CardSubtitle, CardTitle, CardText, CardGroup, Button, ButtonGroup} from 'reactstrap';
import AddButton from './AddButton';
import { get } from '../apiRequests';

/**
 * @props children - wrap modal
 * @param {string} objName
 * @param {object} filter param for fetch request
 * @param {function} toggleModal
 * @param {JSX} children modal
 * Modal is managed in Overwiew class
 */
export default class OverviewWrapper extends React.Component { // Common component for all overviews

    constructor(props){
        super(props);

        this.objName = this.props.objName;
        this.state = {
            elemId: null,
        }
    }

    handleSelectChange = (param, e) =>{
        this.setState({ [param] : e });
    }

    handleIndexChange(id, index) {
        console.log("update index");
    }

    setElement(id){
        this.setState({elemId: id});
    }

    render() {
        if(!this.props.elements) return null;
        let elements = this.state.elemId ? this.props.elements.find(elem => elem._id === this.state.elemId) : this.props.elements;

        return(<>
            <AddButton addFunction={this.props.toggleModal}>Ajouter</AddButton>

            {elements.map((elem, i) => 
                <Card key={i} style={{ width: '18rem' }}>
                    <CardBody>
                        <CardTitle tag="h5">
                            {elem.name}
                        </CardTitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h6" >
                            {elem.sentence}
                        </CardSubtitle>
                        <CardText>
                            {i}
                        </CardText>
                        <CardGroup>
                            <Button className="mx-auto" onClick={this.setElement.bind(this, elem._id)}>
                                Modifier
                            </Button>
                        </CardGroup>

                        <ButtonGroup>
                            <Button onClick={this.handleIndexChange.bind(this, elem._id, -1)}>
                                {"<"}
                            </Button>
                            <Button onClick={this.handleIndexChange.bind(this, elem._id, 1)}>
                                {">"}
                            </Button>
                        </ButtonGroup>
                    </CardBody>
                </Card>
            )}

            {this.props.children} 

        </>);
    }

}