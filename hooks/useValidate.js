import React, { useState, useEffect } from 'react'


const useValidate = (initialState, validate, fn) => {

    const [values, setValues] = useState(initialState)
    const [errors, setErrors] = useState({})
    const [submitForm, setSubmitForm] = useState(false)

    useEffect(() => {
        if (submitForm) {
            const noErrors = Object.keys(errors).length === 0
            if (noErrors) fn()
        }
        setSubmitForm(false)
        // eslint-disable-line
    }, [errors])

    const handleChange = e => setValues({ ...values, [e.target.name]: e.target.value })

    const handleSubmit = e => {
        e.preventDefault()
        const validatingErr = validate(values)
        setErrors(validatingErr)
        setSubmitForm(true)
    }

    return { values, errors, submitForm, handleChange, handleSubmit }

}

export default useValidate