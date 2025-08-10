import React from 'react';
import { FormText, Input } from 'reactstrap';
import MyFormGroup from './MyFormGroup';
import { capitalizeFirstLetter } from '../../utils/stringUtils';

interface SimpleFormGroupProps {
    id: string;                            // id de l'input
    value: string | number;                // valeur de l'input
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // callback pour onChange
    text: string;                          // label texte
    type?: any;                      // type de l'input (par défaut "text")
    required?: boolean;                     // si le champ est requis
    formText?: string;                      // texte d'aide en dessous de l'input
}

const SimpleFormGroup: React.FC<SimpleFormGroupProps> = ({
    id,
    value,
    handleChange,
    text,
    type = 'text',
    required = false,
    formText
}) => {
    return (
        <MyFormGroup text={capitalizeFirstLetter(text)} inputId={id}>
            <Input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={handleChange}
                maxLength={1000}
                required={required}
            />

            {formText && <FormText>{formText}</FormText>}
        </MyFormGroup>
    );
};

export default SimpleFormGroup;
