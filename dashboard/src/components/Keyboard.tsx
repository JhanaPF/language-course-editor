import React from "react";
import { Button } from "reactstrap";

interface KeyboardProps {
    addSpecialCharacterToCase?: (char: string) => void;
}

/**
 * @description Display a button for all special characters
 */
class Keyboard extends React.Component<KeyboardProps> {
    private specialCharacters: string[];

    constructor(props: KeyboardProps) {
        super(props);

        const allSpecialCharacters = "ÁÀÇÉÈÍÌÓÒÚÙùúòóìíèéçàá";
        this.specialCharacters = [];

        for (let index = 0; index < allSpecialCharacters.length; index++) {
            this.specialCharacters.push(allSpecialCharacters[index]);
        }
    }

    render() {
        return (
            <div>
                {this.specialCharacters.map((c, key) => (
                    <Button
                        key={key}
                        onClick={() =>
                            this.props.addSpecialCharacterToCase &&
                            this.props.addSpecialCharacterToCase(c)
                        }
                    >
                        {c}
                    </Button>
                ))}
            </div>
        );
    }
}

export default Keyboard;
