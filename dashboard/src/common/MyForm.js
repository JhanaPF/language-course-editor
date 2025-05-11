import React from 'react'
import { put, post } from '../apiRequests'

/**
 * @constructor (props, inputNames)
 */
export default class MyForm extends React.Component {
    // In the children, call componentdidmount with this.initState([list of inputs], {additional fields like key id})
    // In the children, assign this.inputNames in the constructor or pass it to constructor
    // Assign this.requiredInputs in children constructor

    constructor (props, inputNames) {
        // console.log(other)
        super(props)
        this.state = { fieldError: false, formValid: false }
        this.inputNames = inputNames
        this.handleChange = this.handleChange.bind(this)
        this.getData = this.getData.bind(this)
        this.type = this.props.addModal ? 'addModal' : 'editModal'
    }

    initState (inputNames, additionalFields) {
        const state = {}
        inputNames.forEach(name => {
            state[name] = this.props.levelData ? this.props.levelData[name] : undefined
        })
        state.fieldError = false
        this.setState({ ...state, ...additionalFields })
    }

    handleChange = (event) => {
        const { name, value } = event.currentTarget
        // console.log('handle change', name, value, type)

        const files = event.target.files
        if (files && files[0]) { // Input is a file input, make it more readable
            return this.setState({ [name]: event.target.files[0] })
        }

        if (this.requiredInputs && this.requiredInputs.includes(name)) {
            let isValid = true
            const newState = Object.assign(this.state, { [name]: value })
            this.requiredInputs.forEach(input => {
                if (!newState[input]) isValid = false
            })
            return this.setState({ formValid: isValid })
        }

        this.setState({ [name]: value })
    }

    handleSelectChange = (param, e) => this.setState({ [param]: e })

    getData () {
        const data = {}
        const formData = new FormData()

        this.inputNames.forEach(key => { // Set data and formdata objects
            const stateValue = this.state[key]
            if (!stateValue) return

            let value = stateValue
            if (key === 'translation' || key === 'sentence') { // Question form
                const stringArray = value.split(' ')
                data[key] = stringArray
                value = JSON.stringify(stringArray)
            } else data[key] = stateValue
            formData.append(key, value)
        })

        // console.log(data, {formData});
        return { data, formData }
    }

    update (url) {
        const data = this.getData()
        post(url, data)
    }

    add (url, successCbk, errorCbk) {
        const { formData } = this.getData()
        console.log('Submitting form')
        put(url, formData, successCbk, errorCbk)
    }
}
