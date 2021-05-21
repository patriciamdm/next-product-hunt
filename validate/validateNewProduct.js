const validateNewProduct = values => {

    const errors = {}

    if (!values.name) errors.name = "Name is mandatory"
    if (!values.company) errors.company = "Company name is mandatory"

    if (!values.url) { errors.url = "Product URL is mandatory" }
    else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) { errors.url = "URL not valid" }

    if (!values.description) errors.description = "Add a product description"
    
    return errors
}

export default validateNewProduct