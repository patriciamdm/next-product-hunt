const validateNewAccount = values => {

    const errors = {}

    if (!values.name) errors.name = "Name is mandatory"

    if (!values.email) { errors.email = "Email is mandatory" }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) { errors.email = "Email is not valid" }

    if (!values.password) { errors.password = "Password is mandatory" }
    else if (values.password.length < 6) { errors.password = "Password must be at least 6 characters long" }
    
    return errors
}

export default validateNewAccount