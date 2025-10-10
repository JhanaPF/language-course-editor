//import React, { useState, useEffect } from 'react';
//import { Button, Row, Col, Table, Collapse } from 'reactstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import axios from 'axios';
//import Select from 'react-select';
//
//import WordModal from '../modals/WordModal';
//import WordDetail from '../components/WordDetail';
//import DeleteModal from '../modals/DeleteModal';
//import Word from '../types/word';
//
//const REACT_APP_API_URL = process.env.REACT_APP_API_URL || ''; // ou à définir selon votre environnement
//
//type AuthParams = {
//    token: string;
//    userId: string;
//};
//
//const DictionnaryOverview = ({ token, userId }: AuthParams) => {
//    const [loading, setLoading] = useState(true);
//    const [words, setWords] = useState([]);
//    const [dictionary, setDictionary] = useState<Word[]>([]);
//    const [selectedWord, setSelectedWord] = useState<Word | null>(null);
//    const [selectedWordData, setSelectedWordData] = useState<Word | null>(null);
//    const [addModal, setAddModal] = useState(false);
//    const [editModal, setEditModal] = useState(false);
//    const [deleteModal, setDeleteModal] = useState(false);
//    const [reloadEditModal, setReloadEditModal] = useState(false);
//
//    useEffect(() => {
//        // onFetchdictionary()
//    }, []);
//
//    useEffect(() => {
//        if (reloadEditModal) {
//            setEditModal(true)
//            setReloadEditModal(false)
//        }
//    }, [reloadEditModal])
//
//    const onFetchdictionary = () => {
//        axios
//            .get(`${REACT_APP_API_URL}dictionaries/dictionary`)
//            .then(res => {
//                const dict = res.data.message;
//                const wordOptions = dict.map(w => ({ label: w.word, value: w._id }))
//                setDictionary(dict);
//                setWords(wordOptions);
//                setLoading(false);
//
//                if (selectedWordData) {
//                    onFetchWord(selectedWordData._id);
//                }
//            })
//            .catch(console.log);
//    }
//
//    const onFetchWord = (id) => {
//        setLoading(true);
//
//        const word = dictionary.find(w => w._id === id);
//
//        if (word) {
//            axios.get(`${REACT_APP_API_URL}word/_id/${id}`, {
//                headers: { Authorization: token }
//            })
//                .then(res => {
//                    const data = res.data.message;
//
//                    setSelectedWordData(data);
//                    setSelectedWord({
//                        value: word._id,
//                        label: word.word,
//                        definition: word.definition,
//                        translated_definition: word.translated_definition
//                    });
//                    setLoading(false);
//                })
//                .catch(console.log)
//        } else console.log("Word not found: " + id);
//
//    }
//
//    const toggleModal = (name: any) => {
//        const modalMap = {
//            addModal: [addModal, setAddModal],
//            editModal: [editModal, setEditModal],
//            deleteModal: [deleteModal, setDeleteModal]
//        }
//
//        const [value, setter] = modalMap[name]
//        if (value) {
//            onFetchdictionary()
//        }
//        setter(!value)
//    }
//
//    const reloadModal = (name: any) => {
//        if (name === 'addModal') {
//            setAddModal(false)
//            setReloadEditModal(true)
//        }
//    }
//
//    const handleSelectChange = (_: any, selectedOption: any) => {
//        selectWord(selectedOption.value)
//    }
//
//    const selectWord = (wordId: any) => {
//        onFetchWord(wordId)
//    }
//
//    const deleteWord = () => {
//        if (!selectedWord) {
//            console.log('No word selected for deletion');
//            return;
//        }
//
//        axios.delete(`${REACT_APP_API_URL}word`, {
//            headers: { Authorization: token },
//            data: {
//                word_id: selectedWord.value,
//                userId: userId
//            }
//        })
//            .then(() => {
//                setDeleteModal(false)
//                setSelectedWord(null)
//                setSelectedWordData(null)
//                onFetchdictionary()
//            })
//            .catch(error => {
//                setDeleteModal(false)
//                setSelectedWord(null)
//                setSelectedWordData(null)
//                onFetchdictionary()
//                console.log(error)
//            })
//    }
//
//    return (
//        <div className="App">
//            <Row md='6' className='m-auto mt-4 mx-5'>
//                <Col md='6'>
//                    <Select
//                        className='mt-3'
//                        placeholder="Rechercher un mot"
//                        options={words}
//                        noOptionsMessage={() => null}
//                        value={selectedWord}
//                        onChange={handleSelectChange}
//                    />
//
//                    {!loading &&
//                        <Table className='mt-2' style={{ borderRadius: 10 }} bordered hover responsive>
//                            <thead>
//                                <tr>
//                                    <th>Mot</th>
//                                    <th>Définition</th>
//                                </tr>
//                            </thead>
//                            <tbody>
//                                {dictionary.map((wordData, i) => (
//                                    <tr key={i} onClick={() => selectWord(wordData._id)}>
//                                        <th scope="row">{wordData.word}</th>
//                                        <td>{wordData.translated_definition}</td>
//                                    </tr>
//                                ))}
//                            </tbody>
//                        </Table>
//                    }
//                </Col>
//
//                <Col md='6'>
//                    {selectedWordData &&
//                        <Collapse isOpen={!!selectedWordData}>
//                            <WordDetail selectedWordData={selectedWordData} toggleModal={() => toggleModal('editModal')} />
//                        </Collapse>
//                    }
//
//                    <Col className='text-right'>
//                        <Button className='text-right mt-1' onClick={() => toggleModal('addModal')}>
//                            Ajouter un mot
//                        </Button>
//                    </Col>
//                </Col>
//            </Row>
//
//            {/* MODALES */}
//            <DeleteModal isOpen={deleteModal} toggleModal={() => toggleModal('deleteModal')} delete={deleteWord} />
//
//            {(addModal || editModal) &&
//                <WordModal
//                    addModal={addModal}
//                    editModal={editModal}
//                    wordData={selectedWordData}
//                    toggleModal={() => toggleModal(addModal ? 'addModal' : 'editModal')}
//                    token={token}
//                    userId={userId}
//                    reloadModal={() => reloadModal(addModal ? 'addModal' : 'editModal')}
//                />
//            }
//        </div>
//    )
//}
//
//export default DictionnaryOverview
//