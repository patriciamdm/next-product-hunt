import React, { useState, useContext } from 'react'
import Router, {useRouter} from 'next/router'
import FileUploader from 'react-firebase-file-uploader'

import Layout from '../components/layout/Layout'
import { Form, Field, InputSubmit, ErrorMsg } from '../components/shared/Form'
import {FirebaseContext} from '../firebase'

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

  const [imgName, setImgName] = useState('')
  const [upload, setUpload] = useState(false)
  const [progress, setProgress] = useState(0)
  const [imgUrl, setImgUrl] = useState('')

  const [errorMsg, setErrorMsg] = useState(false)

  const { user, firebase } = useContext(FirebaseContext)
  const router = useRouter()
  
  const { values, errors, handleChange, handleSubmit } = useValidate(initialState, validateNewProduct, createProduct)
  const { name, company, image, url, description } = values

  async function createProduct() {
    if (!user) router.push('/log-in')
    const product = {
      name, company, url, image: imgUrl, description, votes: 0, comments: [], created: Date.now()
    }
    firebase.db.collection('products').add(product)
    return router.push('/')
  }

  const handleUploadStart = () => {
    setProgress(0)
    setUpload(true)
  }

  const handleProgress = progress => setProgress({ progress })
  
  const handleUploadError = err => {
    setProgress(err)
    console.error(err)
  }

  const handleUploadSuccess = name => {
    setProgress(100)
    setUpload(false)
    setImgName(name)
    firebase.storage
      .ref('products')
      .child(name)
      .getDownloadURL()
      .then(url => setImgUrl(url))
  }
        
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
              
              <Field>
                <label htmlFor="image">Image</label>
                <FileUploader accept="image/*" id="image" name="image" randomizeFilename storageRef={firebase.storage.ref('products')}
                  onUploadStart={handleUploadStart} onUploadError={handleUploadError} onUploadSuccess={handleUploadSuccess} onProgress={handleProgress} />
              </Field>
              
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