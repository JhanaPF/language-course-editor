import 'bootstrap/dist/css/bootstrap.min.css';
import React, { ReactNode } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

import Classes from '../enum/classes';
import Sources from '../enum/sources';
import Word from '../types/word';

interface AdditionalData {
    riddle?: string;
    translated_riddle?: string;
    story?: string;
    sentence?: string;
}

interface SelectedWordData {
    word: string;
    class?: string;
    translated_definition?: string;
    definition?: string;
    level?: string;
    categories?: string;
    source?: string | null;
    additionalData: AdditionalData;
}

interface WordDetailProps {
    selectedWordData: Word;
    toggleModal: (modalName: string) => void;
    children?: ReactNode;
}

export default class WordDetail extends React.Component<WordDetailProps> {
    render() {
        const { selectedWordData: selectedWordData, toggleModal } = this.props;

        return (
            <Card color="warning" className="text-left my-3">
                <CardBody className="p-1">
                    <CardTitle tag="h5">
                        Détail du mot sélectionné
                    </CardTitle>
                    <CardText className="p-2">
                        <i
                            onClick={() => toggleModal('editModal')}
                            className="fas fa-edit position-absolute mr-3 fa-xl"
                            style={{ right: 15, top: 0 }}
                        />
                        <i
                            onClick={() => toggleModal('deleteModal')}
                            className="fas fa-trash-alt fa-xl position-absolute mr-1"
                            style={{ right: 0, top: 0 }}
                        />
                        <span className="font-weight-bold"> Mot : </span>
                        {selectedWordData.word}, {selectedWordData.class && Classes.getName(String(selectedWordData.class))} <br/>
                        <span className="font-weight-bold">Définition en français : </span>
                        {selectedWordData.translated_definition} <br/>
                        <span className="font-weight-bold">Définition : </span>
                        {selectedWordData.definition} <br/>
                        <span className="font-weight-bold">Niveau de langage : </span>
                        {selectedWordData.level} <br/>
                        <span className="font-weight-bold">Catégorie(s) : </span>
                        {selectedWordData.categories} <br/>
                        <span className="font-weight-bold">Source : </span>
                        {selectedWordData.source != null && Sources.getName(selectedWordData.source)} <br/>
                        <span className="font-weight-bold">Devinette : </span>
                        {selectedWordData.additionalData.riddle} <br/>
                        <span className="font-weight-bold">Devinette en français : </span>
                        {selectedWordData.additionalData.translated_riddle} <br/>
                        <span className="font-weight-bold">Anecdotes : </span>
                        {selectedWordData.additionalData.story} <br/>
                        <span className="font-weight-bold">Mot en contexte : </span>
                        {selectedWordData.additionalData.sentence} <br/>
                    </CardText>
                </CardBody>
            </Card>
        );
    }
}
