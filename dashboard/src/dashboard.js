import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import {
    Modal, ModalBody, Button,
    Row, Col, Card, CardBody, CardTitle,  
    CardText, Table, Collapse
} from 'reactstrap';
import axios from 'axios';
import Select from 'react-select';
import WordModal from './wordModal';
import Classes from './enum/classes';
// import Categories from './enum/categories';
import Sources from './enum/sources';
import CoursesOverview from './views/CoursesOverview';

class Dashboard extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            loading: true,
            words: [],
            addModal: false,
            editModal: false,
            deleteModal: false,
            selectedWord: undefined, 
            showNativeDefinition: false,
            showTranslatedWord: true,
            dictionnary: null,
        }
        
        this.apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/';
        this.handleChange = this.handleChange.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount(){
        this.onFetchDictionnary();
    }

    componentDidUpdate(){
        //console.log(this.state)
        if(this.state.reloadEditModal) this.setState({editModal: true, reloadEditModal: false});
    }
    
    onFetchDictionnary(){
        axios.get(this.apiUrl + 'dictionaries/dictionnary', {  headers: { 'Authorization': this.props.token } } )
        .then(res => {
            // console.log(res.data.message)
            let setWords = [];
            let newDictionnary =  res.data.message.slice();
            newDictionnary.map(w => setWords.push({label: w.word, value:w._id}));

         
            if(this.state.selectedWordData) {
                //console.log(this.state.selectedWordData)
                this.onFetchWord(this.state.selectedWordData._id);
            }

            this.setState({dictionnary : newDictionnary, words: setWords, loading: false});
        })
        .catch(error => console.log(error))        
    }

    onFetchWord(id){
        this.setState({loading: true});

        let word = this.state.dictionnary.find(w => w._id === id);
        axios.get(
            this.apiUrl + 'word/_id/' + id,
            { headers: { 'Authorization': this.props.token } } 
        )
        .then(res => { 
            //console.log(res.data.message)
            this.setState({ 
                selectedWordData: res.data.message, 
                loading: false,
                selectedWord: {value: word._id, label: word.word, definition: word.definition, translated_definition: word.translated_definition}, 
            });
        })
        .catch(error => console.log(error))
    }

    handleChange = (event) => {
        const {name, value} = event.currentTarget;
        // console.log(name, value)
        // if([name] === "")
        this.setState({ [name] : value });
    }

    toggleModal = (name) =>{
        // console.log("toggleModal")
        if(this.state[name]){
            this.onFetchDictionnary();
        }
        this.setState({[name]: !this.state[name]});
    }

    reloadModal = (name) =>{ 
        if(name === "addModal")
            this.setState({[name]: false, reloadEditModal: true});
    }

    delete(){
        axios.delete(
            this.apiUrl + 'word',              
            {
                headers: { "Authorization": this.props.token },
                data: { word_id: this.state.selectedWord.value, userId: this.props.userId }, // req.data = req.body dans le serveur   
            },
        )
        .then( (res) => {
            //console.log(res)
            this.setState({deleteModal: false, selectedWord: null, selectedWordData: null}, this.onFetchDictionnary);
        })
        .catch(function (error) {
            this.setState({deleteModal: false, selectedWord: null, selectedWordData: null}, this.onFetchDictionnary);
            console.log(error);
        });
    }

    selectWord(wordId){
        this.onFetchWord(wordId);
    }

    handleSelectChange = (param, e) =>{
        this.selectWord(e.value) 
    }

    openCrossWord () {
        window.open(this.apiUrl + 'crossword/')
    }

    render() {
        return (
            <div className="App">
                <Row md='6' className='m-auto mt-4 mx-5'>
                    <Col md='6'>
                        <Select     
                            className='mt-3'
                            placeholder="Rechercher un mot" 
                            options={this.state.words} 
                            noOptionsMessage={() => null}
                            value={this.state.selectedWord}
                            onChange={this.handleSelectChange.bind(this, 'selectedWord')} /> 

                            {!this.state.loading &&                            
                                <Table className='mt-2' style={{borderRadius:10 }} bordered hover responsive >
                                    <thead>
                                      <tr>
                                        <th>Mot</th>
                                        <th>Définition</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.dictionnary.map((wordData, i) => {
                                            return(
                                                <tr key={i} onClick={this.selectWord.bind(this, wordData._id)}>
                                                    <th scope="row">{wordData.word}</th>
                                                    <td>{wordData.translated_definition}</td>
                                                </tr>
                                            )
                                        })}        
                                    </tbody>
                                </Table>    
                            }
                    </Col>
                    <Col md='6'>
                        {this.state.selectedWordData &&
                        <Collapse isOpen={this.state.selectedWordData}>
                            <Card color="warning" className='text-left my-3'>
                                <CardBody className='p-1'>
                                    <CardTitle tag="h5">
                                        Détail du mot sélectionné
                                    </CardTitle>  
                                    <CardText className="p-2"> 
                                        <i onClick={this.toggleModal.bind(this, "editModal")} 
                                            className="fas fa-edit position-absolute mr-3 fa-xl" style={{right: 15, top: 0}}/>
                                        <i onClick={this.toggleModal.bind(this, 'deleteModal')} 
                                            className="fas fa-trash-alt fa-xl position-absolute mr-1" style={{right: 0, top: 0}}/>
                                        <span className="font-weight-bold"> Mot : </span>
                                        { this.state.selectedWordData.word}{', '}{ this.state.selectedWordData.class && Classes.getName(this.state.selectedWordData.class)} <br/>
                                        <span className="font-weight-bold">Définition en français : </span> 
                                        { this.state.selectedWordData.translated_definition} <br/>
                                        <span className="font-weight-bold">Définition : </span> 
                                        { this.state.selectedWordData.definition} <br/>
                                        <span className="font-weight-bold">Niveau de langage : </span> 
                                        { this.state.selectedWordData.level} <br/>
                                        <span className="font-weight-bold">Catégorie(s) : </span> 
                                        { this.state.selectedWordData.categories} <br/>
                                        <span className="font-weight-bold">Source : </span> 
                                        { (this.state.selectedWordData.source !== null) && Sources.getName(this.state.selectedWordData.source)} <br/>
                                        <span className="font-weight-bold">Devinette : </span> 
                                        { this.state.selectedWordData.additionalData.riddle} <br/>
                                        <span className="font-weight-bold">Devinette en français : </span> 
                                        { this.state.selectedWordData.additionalData.translated_riddle} <br/>
                                        <span className="font-weight-bold">Anecdotes : </span> 
                                        { this.state.selectedWordData.additionalData.story} <br/>
                                        <span className="font-weight-bold">Mot en contexte : </span> 
                                        { this.state.selectedWordData.additionalData.sentence} <br/>
                                    </CardText>
                                </CardBody>
                            </Card>  
                        </Collapse>}

                        <Col className='text-right'>
                            <Button className='text-right mt-1' onClick={this.toggleModal.bind(this, "addModal")}>
                                Ajouter un mot 
                            </Button>          
                        </Col> 

                        <Col className='text-right'>
                            <Button className='text-right' onClick={this.openCrossWord.bind(this)}>
                                Jeu de mots-croisés
                            </Button> 
                        </Col> 
                    </Col>

                </Row>  


                <Row>
                    <CoursesOverview/>
                </Row>


                {/********** MODALES ***********/}
                
                <Modal size='sm' isOpen={this.state.deleteModal} >   {/* Modale de confirmation de suppression */}             
                    <ModalBody>
                        <Col className='text-center'>
                            <Button onClick={this.toggleModal.bind(this, "deleteModal")} >
                                Annuler
                            </Button>
                            {'  '}
                            <Button onClick={this.delete.bind(this)} color='danger'>
                                Supprimer
                            </Button>                       
                        </Col> 
                    </ModalBody>
                </Modal>

                {this.state.addModal &&
                    <WordModal
                        addModal
                        toggleModal={this.toggleModal.bind(this, "addModal")}
                        token={this.props.token}
                        userId={this.props.userId}
                        reloadModal={this.reloadModal.bind(this, "addModal")}
                    />
                }  
                
                {this.state.editModal &&
                    <WordModal
                        editModal
                        wordData={this.state.selectedWordData}
                        toggleModal={this.toggleModal.bind(this, "editModal")}
                        token={this.props.token}
                        userId={this.props.userId}
                        reloadModal={this.reloadModal.bind(this, "editModal")}
                    />
                }               

            </div>
        );
    }

}

export default Dashboard;