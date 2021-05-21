import React, { useState } from 'react'
import Router from 'next/router'

import Layout from '../components/layout/Layout'
import { Form, Field, InputSubmit, ErrorMsg } from '../components/shared/Form'
import firebase from '../firebase'

import useValidate from '../hooks/useValidate'
import validateNewAccount from '../validate/validateNewAccount'

const initialState = {
  name: '',
  email: '',
  password: ''
}


const SignUp = () => {

  const [errorMsg, setErrorMsg] = useState(false)
  
  const { values, errors, handleChange, handleSubmit } = useValidate(initialState, validateNewAccount, createAccount)
  const { name, email, password } = values
  
  async function createAccount() {
    try {
      await firebase.signup(name, email, password)
      Router.push('/')
    } catch (err) {
      console.error('There was an error creating user:', err.message)
      setErrorMsg(err.message)
    }
  }

  return (
    <div>
      <Layout>
        <>
          <h1 style={{ textAlign: 'center', marginTop: '5rem'}}>Create account</h1>
          <Form onSubmit={handleSubmit}>
            
            <Field>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Your name" name="name" value={name} onChange={handleChange} />
            </Field>
            {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}

            <Field>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Your email" name="email" value={email} onChange={handleChange} />
            </Field>
            {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}

            <Field>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Your password" name="password" value={password} onChange={handleChange} />
            </Field>
            {errors.password && <ErrorMsg>{errors.password}</ErrorMsg>}
            
            {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}

            <InputSubmit type="submit" value="Create account" />
          </Form>
        </>
      </Layout>
    </div>
  )
}

export default SignUp