import React from 'react'
import { Button } from 'reactstrap'

/**
 * @description Display a button for all special characters 
 */
class Keyboard extends React.Component {
    constructor () {
        super()

        const allSpecialCharacters = 'ÁÀÇÉÈÍÌÓÒÚÙùúòóìíèéçàá'
        this.specialCharacters = []
        for (let index = 0; index < allSpecialCharacters.length; index++) {
            this.specialCharacters.push(allSpecialCharacters[index])
        }
    }

    render () {
        return (
            <div>
                {this.specialCharacters.map((c, key) =>
                    <Button key={key} onClick={this.addSpecialCharacterToCase.bind(this, c)}>{c}</Button>
                )}
            </div>
        )
    }
}

export default Keyboard
