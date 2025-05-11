import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { Button, Row, Col, Table, Collapse } from 'reactstrap'
import axios from 'axios'
import Select from 'react-select'
import WordModal from '../modals/WordModal'
import WordDetail from '../components/WordDetail'
import DeleteModal from '../modals/DeleteModal'

class Dashboard extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            loading: true,
            words: [],
            addModal: false,
            editModal: false,
            deleteModal: false,
            selectedWord: undefined,
            dictionary: null
        }

        this.apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/'
        this.handleChange = this.handleChange.bind(this)
        this.delete = this.delete.bind(this)
    }

    componentDidMount () {
        // this.onFetchdictionary();
    }

    componentDidUpdate () {
        // console.log(this.state)
        if (this.state.reloadEditModal) this.setState({ editModal: true, reloadEditModal: false })
    }

    onFetchdictionary () {
        axios.get(this.apiUrl + 'dictionaries/dictionary')
            .then(res => {
            // console.log(res.data.message)
                const setWords = []
                const newDictionary = res.data.message.slice()
                newDictionary.map(w => setWords.push({ label: w.word, value: w._id }))

                if (this.state.selectedWordData) {
                // console.log(this.state.selectedWordData)
                    this.onFetchWord(this.state.selectedWordData._id)
                }

                this.setState({ dictionary: newDictionary, words: setWords, loading: false })
            })
            .catch(error => console.log(error))
    }

    onFetchWord (id) {
        this.setState({ loading: true })

        const word = this.state.dictionary.find(w => w._id === id)
        axios.get(
            this.apiUrl + 'word/_id/' + id,
            { headers: { Authorization: this.props.token } }
        )
            .then(res => {
            // console.log(res.data.message)
                this.setState({
                    selectedWordData: res.data.message,
                    loading: false,
                    selectedWord: { value: word._id, label: word.word, definition: word.definition, translated_definition: word.translated_definition }
                })
            })
            .catch(error => console.log(error))
    }

    handleChange = (event) => {
        const { name, value } = event.currentTarget
        // console.log(name, value)
        // if([name] === "")
        this.setState({ [name]: value })
    }

    toggleModal = (name) => {
        // console.log("toggleModal")
        if (this.state[name]) {
            this.onFetchdictionary()
        }
        this.setState({ [name]: !this.state[name] })
    }

    reloadModal = (name) => {
        if (name === 'addModal') this.setState({ [name]: false, reloadEditModal: true })
    }

    delete () {
        if (!this.state.selectedWord) {
            console.log('No word selected for deletion')
            return
        }

        axios.delete(
            this.apiUrl + 'word',
            {
                headers: { Authorization: this.props.token },
                data: { word_id: this.state.selectedWord.value, userId: this.props.userId } // req.data = req.body dans le serveur
            }
        )
            .then((res) => {
            // console.log(res)
                this.setState({ deleteModal: false, selectedWord: null, selectedWordData: null }, this.onFetchdictionary)
            })
            .catch(function (error) {
                this.setState({ deleteModal: false, selectedWord: null, selectedWordData: null }, this.onFetchdictionary)
                console.log(error)
            })
    }

    selectWord (wordId) {
        this.onFetchWord(wordId)
    }

    handleSelectChange = (param, e) => {
        this.selectWord(e.value)
    }

    openCrossWord () {
        window.open(this.apiUrl + 'crossword/')
    }

    render () {
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
                            onChange={this.handleSelectChange.bind(this, 'selectedWord')}
                        />

                        {!this.state.loading &&
                            <Table className='mt-2' style={{ borderRadius: 10 }} bordered hover responsive >
                                <thead>
                                    <tr>
                                        <th>Mot</th>
                                        <th>Définition</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.dictionary.map((wordData, i) => {
                                        return (
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
                                <WordDetail selectedWordData={this.state.selectedWordData} toggleModal={this.toggleModal.bind(this)}/>
                            </Collapse>
                        }

                        <Col className='text-right'>
                            <Button className='text-right mt-1' onClick={this.toggleModal.bind(this, 'addModal')}>
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

                {/** ******** MODALES ***********/}

                <DeleteModal isOpen={this.state.deleteModal} toggleModal={this.toggleModal.bind(this)} delete={this.delete.bind(this)} />

                {(this.state.addModal || this.state.editModal) &&
                    <WordModal
                        addModal={this.state.addModal}
                        editModal={this.state.editModal}
                        wordData={this.state.selectedWordData}
                        toggleModal={this.toggleModal.bind(this, this.state.addModal ? 'addModal' : 'editModal')}
                        token={this.props.token}
                        userId={this.props.userId}
                        reloadModal={this.reloadModal.bind(this, this.state.addModal ? 'addModal' : 'editModal')}
                    />
                }

            </div>
        )
    }
}

export default Dashboard
