import React from 'react'
import Layout from '../components/layout/Layout'
import { Form, Field, InputSubmit } from '../components/shared/Form'

const SignUp =() => {
  return (
    <div>
      <Layout>
        <>
          <h1 style={{ textAlign: 'center', marginTop: '5rem'}}>Create account</h1>
          <Form>
            <Field>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Your name" name="name" />
            </Field>
            <Field>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Your email" name="email" />
            </Field>
            <Field>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Your password" name="password" />
            </Field>
            <InputSubmit type="submit" value="Create account" />
          </Form>
        </>
      </Layout>
    </div>
  )
}

export default SignUp