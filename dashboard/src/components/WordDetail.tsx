import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { Card, CardBody, CardTitle, CardText } from 'reactstrap'
import Classes from '../enum/classes'
// import Categories from './enum/categories';
import Sources from '../enum/sources'

/**
 * @description Word detail from dictionnary
 */
export default class WordDetail extends React.Component {
    render () {
        return (
            <Card color="warning" className='text-left my-3'>
                <CardBody className='p-1'>
                    <CardTitle tag="h5">
                        Détail du mot sélectionné
                    </CardTitle>
                    <CardText className="p-2">
                        <i onClick={this.props.toggleModal.bind(this, 'editModal')}
                            className="fas fa-edit position-absolute mr-3 fa-xl" style={{ right: 15, top: 0 }}/>
                        <i onClick={this.props.toggleModal.bind(this, 'deleteModal')}
                            className="fas fa-trash-alt fa-xl position-absolute mr-1" style={{ right: 0, top: 0 }}/>
                        <span className="font-weight-bold"> Mot : </span>
                        {this.props.selectedWordData.word}{', '}{ this.props.selectedWordData.class && Classes.getName(this.props.selectedWordData.class)} <br/>
                        <span className="font-weight-bold">Définition en français : </span>
                        {this.props.selectedWordData.translated_definition} <br/>
                        <span className="font-weight-bold">Définition : </span>
                        {this.props.selectedWordData.definition} <br/>
                        <span className="font-weight-bold">Niveau de langage : </span>
                        {this.props.selectedWordData.level} <br/>
                        <span className="font-weight-bold">Catégorie(s) : </span>
                        {this.props.selectedWordData.categories} <br/>
                        <span className="font-weight-bold">Source : </span>
                        {(this.props.selectedWordData.source !== null) && Sources.getName(this.props.selectedWordData.source)} <br/>
                        <span className="font-weight-bold">Devinette : </span>
                        {this.props.selectedWordData.additionalData.riddle} <br/>
                        <span className="font-weight-bold">Devinette en français : </span>
                        {this.props.selectedWordData.additionalData.translated_riddle} <br/>
                        <span className="font-weight-bold">Anecdotes : </span>
                        {this.props.selectedWordData.additionalData.story} <br/>
                        <span className="font-weight-bold">Mot en contexte : </span>
                        {this.props.selectedWordData.additionalData.sentence} <br/>
                    </CardText>
                </CardBody>
            </Card>
        )
    }
}
