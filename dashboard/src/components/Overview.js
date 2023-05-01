import React from 'react';
import {Card, CardBody, CardSubtitle, CardTitle, CardText, Button, ButtonGroup} from 'reactstrap';
import AddButton from '../components/AddButton';
import { get } from '../apiRequests';


/**
 * @props children - wrap modal
 * @param {string} objName
 * @param {object} filter param for fetch request
 */
export default class Overview extends React.Component { // Show all lessons of a course

    constructor(props){
        super(props);
        //console.log(this.props.course)

        this.state = {
            elements: this.props.elements,
            modal: false,
        }

        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    componentDidMount(){
        this.fetchLessons();
    }

    fetchLessons(){
        var initState=(fields)=>{this.setState({loading: false, lessonModal: false, ...fields})};
        get(this.props.objName, this.props.filter, (res)=>initState({lessons: res}), ()=>initState());
    }

    handleSelectChange = (param, e) =>{
        this.setState({ [param] : e });
    }

    handleIndexChange(id, index) {
        console.log("update lesson index");
    }

    closeModal(){
        this.setState({lessonModal: false});
    }

    openModal(){
        this.setState({lessonModal: true});
    }

    render() {
        if(!this.state.lessons) return null;

        return(<>

            <AddButton addFunction={this.openModal}>Ajouter</AddButton>

    
            {this.state.elements.map((elem, i) => 
                <Card key={i} style={{ width: '18rem' }}>
                    {this.props.course.flag_url &&
                        <img src={this.props.course.flag_url} />
                    }

                    <CardBody>
                        <CardTitle tag="h5">
                            {elem.name}
                        </CardTitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h6" >
                            {elem.sentence}
                        </CardSubtitle>
                        <CardText>
                            Détail
                        </CardText>
                        <Button onClick={this.openModal}>
                            Modifier
                        </Button>
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