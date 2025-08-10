// @ts-nocheck

import React from 'react'
import { Modal, ModalBody, ModalFooter, Form, FormText, FormGroup, Input, Label, Button, Row, Col } from 'reactstrap'
import axios from 'axios'
import Select, { SingleValue, ActionMeta } from "react-select";
import { validString } from '../utils/regex'
import Classes from '../enum/classes'
import Categories from '../enum/categories'
import Sources from '../enum/sources'
import AudioRecorder from '../components/forms/AudioRecorder'
import WordData from '../types/word'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL || "";
interface AdditionalData {
  story?: string;
  sentence?: string;
}

interface OptionType {
  value: string;
  label: string;
}

interface Props {
    addModal?: boolean;
    editModal?: boolean;
    wordData: WordData | null;
    additional?: AdditionalData;
    userId: string;
    token: string;
    toggleModal: (type?: string) => void;
    reloadModal?: () => void;
}

interface State {
    fieldError?: boolean;
    word?: string | null;
    class?: OptionType;
    definition?: string | null;
    translated_word?: string | null;
    translated_definition?: string | null;
    level: string;
    categories?: OptionType[] | null;
    source?: OptionType | null;
    story?: string | null;
    sentence?: string | null;
    audioFile?: File | null;
    vocalFile?: File | null;
}



export default class WordModal extends React.Component<Props, State> {
    private categoriesOptions: OptionType[];
    private sourceOptions: OptionType[];
    private classOptions: OptionType[];
    private type: string;

    constructor(props: Props) {
        super(props);

        this.categoriesOptions = Categories.values();
        this.sourceOptions = Sources.values();
        this.classOptions = Classes.values();

        if (this.props.editModal) {
            const categories: OptionType[] = [];
            if (this.props.wordData?.categories) {
                this.props.wordData.categories.forEach(cat => {
                    categories.push({ value: cat, label: Categories.getName(cat) });
                });
            }

            if (this.props.wordData) {
                this.state = {
                    fieldError: false,
                    word: props.wordData.word || null,
                    class: props.wordData.class
                        ? { value: props.wordData.class, label: Classes.getName(props.wordData.class) }
                        : undefined,
                    definition: props.wordData.definition || null,
                    translated_word: props.wordData.translated_word || null,
                    translated_definition: props.wordData.translated_definition || null,
                    level: props.wordData.level || "1",
                    categories,
                    source: props.wordData.source
                        ? { value: props.wordData.source, label: Sources.getName(props.wordData.source) }
                        : {},
                    story: props.additional?.story || null,
                    sentence: props.additional?.sentence || null,
                    audioFile: null,
                    vocalFile: null,
                };
            } else {
                this.state = {
                    level: "1",
                    source: 0,
                    audioFile: null,
                    vocalFile: null,
                };
            }
        } else {
            this.state = {
                level: "1",
                source: 0,
            };
        }

        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.update = this.update.bind(this);
        this.type = this.props.addModal ? "addModal" : "editModal";
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.currentTarget;

        if (name === "vocalFile" && event.target instanceof HTMLInputElement && event.target.files?.length) {
            return this.setState({ [name]: event.target.files[0] } as unknown as Pick<State, keyof State>);
        }

        if (name !== "level" && validString.test(value[value.length - 1])) {
            this.setState({ [name]: value } as unknown as Pick<State, keyof State>);
        } else if (name !== "level") {
            this.setState({ [name]: null } as unknown as Pick<State, keyof State>);
        }

        if (name === "level") {
            this.setState({ [name]: value } as unknown as Pick<State, keyof State>);
        }
    };


handleSelectChange = (
  newValue: SingleValue<OptionType>,
  _actionMeta: ActionMeta<OptionType>
) => {
  this.setState({ source: newValue });
};

    isValid() {
        return Boolean(this.state.word);
    }

    getData() {
        return {
            word_id: this.props.wordData ? this.props.wordData._id : null,
            word: {
                word: this.state.word,
                class: this.state.class ? this.state.class.value : null,
                definition: this.state.definition || null,
                translated_definition: this.state.translated_definition || null,
                level: this.state.level,
                source: typeof this.state.source === "object" && this.state.source !== null
                    ? this.state.source.value
                    : null,
                categories: this.state.categories ? this.state.categories.map(category => category.value) : null,
            },
            additionalData: {
                sentence: this.state.sentence || null,
                story: this.state.story || null,
            },
            userId: this.props.userId,
            collection: "french_from_french",
            audioFile: this.state.audioFile,
        };
    }

    update() {
        if (!this.isValid()) return;

        const save = this.getData();
        axios
            .post(`${REACT_APP_API_URL}word`, save, {
                headers: { Authorization: this.props.token, "Content-Type": "multipart/form-data" },
            })
            .then(() => this.props.toggleModal())
            .catch(error => console.log(error));
    }

    save = (next?: boolean) => {
        if (!this.isValid()) return;

        const formData = new FormData();
        if (this.state.vocalFile) {
            formData.append("audio-file", this.state.vocalFile);
        }

        axios
            .put(`${REACT_APP_API_URL}dictionaries/word`, formData, {
                headers: {
                    Authorization: this.props.token,
                    Accept: "application/json",
                },
            })
            .then(() => {
                if (next) {
                    this.props.reloadModal && this.props.reloadModal();
                } else {
                    this.props.toggleModal();
                }
            })
            .catch(() => {
                console.error(formData);
            });
    };

    saveAudio(file: File) {
        this.setState({ audioFile: file });
    }

    render() {
        return (
            <Modal isOpen={true} size='lg' style={{ overflowY: 'auto' }}>
                <ModalBody className=''>
                    <Row className='border-bottom pb-3'>
                        <Col md='10'>
                            <h4>
                                {this.props.addModal && 'Ajouter '}
                                {this.props.editModal && 'Modifier '}
                                un mot dans le dictionnaire
                            </h4>
                        </Col>
                        <Col className='text-right ml-auto'>
                            <button onClick={this.props.toggleModal.bind(this, this.type)} type="button" className="btn btn-outline-secondary text-right ml-auto">X</button>
                        </Col>
                    </Row>
                    <Form>
                        <FormGroup className='mx-2'>
                            <Label className='text-left mr-4' for="word">
                                Mot:
                            </Label>
                            <Input
                                id="word"
                                name="word"
                                value={this.state.word}
                                onChange={this.handleChange}
                                invalid={!this.state.word} />
                        </FormGroup>
                        <FormGroup className='mx-2 mb-3'>
                            <Label className='text-left'>
                                Classe:
                            </Label>
                            <Select
                                name="class"
                                value={this.state.class}
                                onChange={this.handleSelectChange.bind(this, 'class')}
                                options={this.classOptions}
                                placeholder="" />
                        </FormGroup>
                        <FormGroup className='mx-2'>
                            <Label className='text-left mr-4'>
                                Enregistrement vocal du mot:
                            </Label>
                            <AudioRecorder saveAudio={this.saveAudio.bind(this)} />
                        </FormGroup>
                        <FormGroup className='mx-2 mb-3' >
                            <Label for="vocalFile">
                                Fichier vocal
                            </Label>
                            <Col sm={10}>
                                <Input id="vocalFile" name="vocalFile" type="file" onChange={this.handleChange} />
                                <FormText>
                                    Ajouter un fichier vocal
                                </FormText>
                            </Col>
                        </FormGroup>
                        <FormGroup className='mx-2 mb-3'>
                            <Label className='text-left' for="translated_definition">
                                Définition (en langue pivot):
                            </Label>
                            <Input
                                id="translated_definition"
                                name="translated_definition"
                                value={this.state.translated_definition}
                                onChange={this.handleChange}
                                type='textarea' />
                        </FormGroup>
                        <FormGroup className='mx-2 mb-3'>
                            <Label className='text-left' for="definition">
                                Définition:
                            </Label>
                            <Input
                                id="definition"
                                name="definition"
                                value={this.state.definition}
                                onChange={this.handleChange}
                                type='textarea' />
                        </FormGroup>
                        <FormGroup className='mx-2'>
                            <Label className='text-left' for="story">
                                Anecdote(s):
                            </Label>
                            <Input
                                id={'story'}
                                name="story"
                                value={this.state.story}
                                onChange={this.handleChange}
                                type='textarea' />
                        </FormGroup>
                        <FormGroup className='mx-2'>
                            <Label className='text-left' for="sentence">
                                Mot en contexte dans une phrase:
                            </Label>
                            <Input
                                id="sentence"
                                name="sentence"
                                value={this.state.sentence}
                                onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup className='mx-2'>
                            <Label className='text-left' for="level">
                                Niveau de langage:
                            </Label>
                            <Input
                                id="level"
                                name="level"
                                type="select"
                                value={this.state.level}
                                onChange={this.handleChange}
                                className="ml-1 mr-5">
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                            </Input>
                        </FormGroup>
                        <FormGroup className='mx-2'>
                            <Label className='text-left' for="categories">
                                Catégorie(s):
                            </Label>
                            <Select
                                id="categories"
                                name="categories"
                                isMulti
                                value={this.state.categories}
                                onChange={this.handleSelectChange.bind(this)}
                                options={this.categoriesOptions}
                                placeholder="" />
                        </FormGroup>
                        <FormGroup className='mx-2'>
                            <Label className='text-left' for="source">
                                Source:
                            </Label>
                            <Select
                                id="source"
                                name="source"
                                value={this.state.source}
                                onChange={this.handleSelectChange.bind(this)}
                                options={this.sourceOptions}
                                placeholder="" />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Col className='text-right mt-4'>
                        {this.props.addModal &&
                            <>
                                <Button onClick={this.props.toggleModal.bind(this, this.type)}>
                                    Quitter
                                </Button>
                                {' '}
                                <Button onClick={this.save.bind(this, false)} className='bg-success'>
                                    Ajouter
                                </Button>
                                {' '}
                                <Button onClick={this.save.bind(this, true)} className='bg-success'>
                                    Ajouter et continuer
                                </Button>
                            </>
                        }

                        {this.props.editModal &&
                            <Col className='text-right'>
                                <Button onClick={this.update} className='bg-success'>
                                    Modifier
                                </Button>
                            </Col>
                        }
                    </Col>
                </ModalFooter>
            </Modal>
        );
    }
}