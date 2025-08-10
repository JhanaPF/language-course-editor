import React, { useState, useEffect, useMemo } from 'react';
import { put, post } from '../api/apiRequests';
import { AxiosCallback, AxiosErrCbk } from '../types/request';

type UseFormParams<T extends string = string> = {
    addModal?: boolean;
    levelData?: Partial<Record<T, any>>;
    inputNames?: T[];
    requiredInputs?: string[];
    [key: string]: any; // permet de supporter ...props
};

type UseFormReturn<T extends string = string> = {
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    add: (url: string, successCbk?: () => void, errorCbk?: () => void) => void;
    update: (url: string, successCbk?: () => void, errorCbk?: () => void) => void;
    getData: any;
    handleSelectChange: any;
    formState: Record<string, any>;
    formValid: any;
    setFormValid: any;
    fieldError: any;
    setFieldError: any;
    type: any;
    setFormState: React.Dispatch<React.SetStateAction<Record<T, any>>>;
};

export default function useForm<T extends string = string>({
    addModal = false,
    levelData = {},
    inputNames = [],
    requiredInputs = [],
    ...props
}: UseFormParams<T>): UseFormReturn<T> {

    const [formState, setFormState] = useState<Record<string, any>>({});
    const [formValid, setFormValid] = useState(false);
    const [fieldError, setFieldError] = useState(false);

    const type = useMemo(() => (addModal ? 'addModal' : 'editModal'), [addModal]);

    useEffect(() => {
        const initialState = {} as any;

        inputNames.forEach(name => {
            initialState[name] = levelData ? levelData[name] : undefined;
        });

        initialState.fieldError = false;
        setFormState(prev => ({ ...prev, ...initialState }));
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        // @ts-expect-error: Only input type files has files variable so TS warns about as he doesnt know if it is the right input type
        const { name, value, files } = event.target;

        // Gestion fichier
        if (files && files[0]) {
            setFormState(prev => ({ ...prev, [name]: files[0] }));
            return;
        }

        // Vérifie les champs requis
        if (requiredInputs.includes(name)) {
            const newState = { ...formState, [name]: value };
            const isValid = requiredInputs.every(input => !!newState[input]);
            setFormValid(isValid);
            setFormState(newState);
        } else {
            setFormState(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSelectChange = (param: string, option: any) => {
        setFormState(prev => ({ ...prev, [param]: option }));
    };

    const getData = () => {
        const data = {} as any;
        const formData = new FormData();

        inputNames.forEach(key => {
            const stateValue = formState[key];
            if (!stateValue) return;

            let value = stateValue;

            if (key === 'translation' || key === 'sentence') {
                const stringArray = value.split(' ');
                data[key] = stringArray;
                value = JSON.stringify(stringArray);
            } else {
                data[key] = value;
            }

            formData.append(key, value);
        });

        return { data, formData };
    };

    const update = (url: string) => {
        const data = getData();
        post(url, data, undefined, undefined);
    };

    const add = (
        url: string,
        successCbk?: AxiosCallback,
        errorCbk?: AxiosErrCbk
    ) => {
        const { formData } = getData();
        console.log('Submitting form');
        put(url, formData, successCbk, errorCbk);
    };

    return {
        add,
        update,
        getData,
        handleChange,
        handleSelectChange,
        formValid,
        setFormValid,
        fieldError,
        setFieldError,
        type,
        formState,
        setFormState
    };
}