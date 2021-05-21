import React, { useState } from 'react'
import Router from 'next/router'

import Layout from '../components/layout/Layout'
import { Form, Field, InputSubmit, ErrorMsg } from '../components/shared/Form'
import firebase from '../firebase'

import useValidate from '../hooks/useValidate'
import validateNewProduct from '../validate/validateNewProduct'

const initialState = {
  name: '',
  company: '',
  image: '',
  url: '',
  description: ''
}


const NewProduct =() => {

  const [errorMsg, setErrorMsg] = useState(false)
  
  const { values, errors, handleChange, handleSubmit } = useValidate(initialState, validateNewProduct, createProduct)
  const { name, company, image, url, description } = values
  
  async function createProduct() { }
  //   try {
  //     await firebase.signup(name, email, password)
  //     Router.push('/')
  //   } catch (err) {
  //     console.error('There was an error creating user:', err.message)
  //     setErrorMsg(err.message)
  //   }

  return (
    <div>
      <Layout>
        <>
          <h1 style={{ textAlign: 'center', marginTop: '5rem'}}>New product</h1>
          <Form onSubmit={handleSubmit}>

            <fieldset>
              <legend>General information</legend>
            
              <Field>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Product name" name="name" value={name} onChange={handleChange} />
              </Field>
              {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
              
              <Field>
                <label htmlFor="company">Company</label>
                <input type="text" id="company" placeholder="Company name" name="company" value={company} onChange={handleChange} />
              </Field>
              {errors.company && <ErrorMsg>{errors.company}</ErrorMsg>}
              
              {/* <Field>
                <label htmlFor="image">Image</label>
                <input type="file" id="image" name="image" value={image} onChange={handleChange} />
              </Field>
              {errors.image && <ErrorMsg>{errors.image}</ErrorMsg>} */}
              
              <Field>
                <label htmlFor="url">URL</label>
                <input type="url" id="url" placeholder="Product URL" name="url" value={url} onChange={handleChange} />
              </Field>
              {errors.url && <ErrorMsg>{errors.url}</ErrorMsg>}
              
            </fieldset>
            <fieldset>
              <legend>About your product</legend>

              <Field>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" value={description} onChange={handleChange} />
              </Field>
              {errors.description && <ErrorMsg>{errors.description}</ErrorMsg>}

            </fieldset>

            {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}

            <InputSubmit type="submit" value="Create product" />
          </Form>
        </>
      </Layout>
    </div>
  )
}

export default NewProduct