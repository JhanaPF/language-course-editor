import React, { useState, useEffect, useMemo } from 'react'
import { put, post } from '../api/apiRequests'

/**
 * @description Custom hook for form logic - Call it like this:
 * 	const {
		 handleChange,
		 add,
		 formState
	 } = useForm({inputNames: ['language', 'pivot_language', 'file', 'raw_name']})
 * @param {Boolean} addModal
 * @param {Object} levelData - follows inputNames keys for edit form
 * @param {Array} inputNames
 * @param {Array} requiredInputs
 */
export default function useForm ({ addModal, levelData, inputNames = [], requiredInputs = [], ...props }) {
	const [formState, setFormState] = useState({})
	const [formValid, setFormValid] = useState(false)
	const [fieldError, setFieldError] = useState(false)

	const type = useMemo(() => (addModal ? 'addModal' : 'editModal'), [addModal])

	useEffect(() => {
		const initialState = {};

		inputNames.forEach(name => {
			initialState[name] = levelData ? levelData[name] : undefined
		})

		initialState.fieldError = false
		setFormState(prev => ({ ...prev, ...initialState }))
	}, [])

	const handleChange = (event) => {
		const { name, value, files } = event.target

		// Gestion fichier
		if (files && files[0]) {
			setFormState(prev => ({ ...prev, [name]: files[0] }))
			return
		}

		// Vérifie les champs requis
		if (requiredInputs.includes(name)) {
			const newState = { ...formState, [name]: value }
			const isValid = requiredInputs.every(input => !!newState[input])
			setFormValid(isValid)
			setFormState(newState)
		} else {
			setFormState(prev => ({ ...prev, [name]: value }))
		}
	}

	const handleSelectChange = (param, option) => {
		setFormState(prev => ({ ...prev, [param]: option }))
	}

	const getData = () => {
		const data = {}
		const formData = new FormData()

		inputNames.forEach(key => {
			const stateValue = formState[key]
			if (!stateValue) return

			let value = stateValue

			if (key === 'translation' || key === 'sentence') {
				const stringArray = value.split(' ')
				data[key] = stringArray
				value = JSON.stringify(stringArray)
			} else {
				data[key] = value
			}

			formData.append(key, value)
		})

		return { data, formData }
	}

	const update = (url) => {
		const data = getData()
		post(url, data)
	}

	const add = (url, successCbk, errorCbk) => {
		const { formData } = getData()
		console.log('Submitting form')
		put(url, formData, successCbk, errorCbk)
	}

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
	}
}