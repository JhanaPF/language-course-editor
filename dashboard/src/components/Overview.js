import React from 'react';
import {Card, CardBody, CardSubtitle, CardTitle, CardText, CardGroup, Button, ButtonGroup} from 'reactstrap';
import AddButton from '../components/AddButton';
import { get } from '../apiRequests';


/**
 * @props children - wrap modal
 * @param {string} objName
 * @param {object} filter param for fetch request
 */
export default class Overview extends React.Component { // Common component for all overviews

    constructor(props){
        super(props);
        //console.log(this.props.course)
        this.objName = this.props.objName;
        this.state = {
            elements: this.props.elements,
            elemId: null,
            modal: false,
        }
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    componentDidMount(){
        this.onFetch();
    }

    onFetch(){
        var initState=(fields)=>{this.setState({loading: false, modal: false, ...fields})};
        get(this.props.objName, this.props.filter, (res)=>initState({elements: res}), ()=>initState());
    }

    handleSelectChange = (param, e) =>{
        this.setState({ [param] : e });
    }

    handleIndexChange(id, index) {
        console.log("update index");
    }

    closeModal(){
        this.setState({modal: false});
    }

    openModal(){
        this.setState({modal: true});
    }

    toggleModal(){
        this.setState({modal: !this.state.modal});
    }

    setElement(id){
        this.setState({courseId: id})
    }

    render() {
        if(!this.state.elements) return null;
        let elements = this.state.elemId ? this.state.elements.find(elem => elem._id === this.state.elemId) : this.state.elements;
        return(<>

            <AddButton addFunction={this.openModal}>Ajouter</AddButton>

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
                            <Button className="mx-auto" onClick={this.openModal}>
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