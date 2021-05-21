import React, { useState } from 'react'
import Router from 'next/router'

import Layout from '../components/layout/Layout'
import { Form, Field, InputSubmit, ErrorMsg } from '../components/shared/Form'
import firebase from '../firebase'

import useValidate from '../hooks/useValidate'
import validateLogIn from '../validate/validateLogIn'

const initialState = {
  email: '',
  password: ''
}


const LogIn =() => {

  const [errorMsg, setErrorMsg] = useState(false)
  
  const { values, errors, handleChange, handleSubmit } = useValidate(initialState, validateLogIn, login)
  const { email, password } = values
  
  async function login() {
    try {
      await firebase.login(email, password)
      Router.push('/')
    } catch (err) {
      console.error('There was an error authenticating user:', err.message)
      setErrorMsg(err.message)
    }
  }

  return (
    <div>
      <Layout>
        <>
          <h1 style={{ textAlign: 'center', marginTop: '5rem'}}>Log in</h1>
          <Form onSubmit={handleSubmit}>

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

            <InputSubmit type="submit" value="Log in" />
          </Form>
        </>
      </Layout>
    </div>
  )
}

export default LogIn