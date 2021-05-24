import React, { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { FirebaseContext } from '../../firebase'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import styled from '@emotion/styled'

import Layout from '../../components/layout/Layout'
import Error404 from '../../components/shared/404'
import {Field, InputSubmit} from '../../components/shared/Form'
import Button from '../../components/shared/Button'


const ProdContainer = styled.div`
   @media (min-width:768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
        }
`

const ProductCreator = styled.p`
    padding: .5rem 2rem;
    background-color: var(--orange);
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`




const Product = () => {
    
    const [product, setProduct] = useState({})
    const [error, setError] = useState(false)

    const { comments, created, company, name, description, image, url, votes } = product

    const { firebase, user } = useContext(FirebaseContext)
    const router = useRouter()
    const { query: { id } } = router

    useEffect(() => {
        if (id) {
            const getProduct = async () => {
                const prodQuery = await firebase.db.collection('products').doc(id)
                const product = await prodQuery.get()
                if (product.exists) { setProduct(product.data()) }
                else { setError(true) }
                
            }
            getProduct()
        }
    }, [id])

    if (error) return <Layout><Error404 text="Product doesn't exist." /></Layout>
    else if (Object.keys(product).length === 0) return <Layout><h2 style={{ marginTop: '5rem', textAlign: 'center' }}>Loading product...</h2></Layout>
    else return (
        <Layout>
            <>
            <h1 style={{ marginTop: '5rem', textAlign: 'center' }}>{name}</h1>
            <ProdContainer>
                <section>
                    <article>
                        <p>Published: {formatDistanceToNow(new Date(created))} ago</p>
                        {/* <p>By: {company} </p> */}
                        <img src={image} style={{width: '100%'}} />
                        <p>{description}</p>
                        {user
                            &&
                            <>
                                <h2>Add your comment</h2>
                                <form >
                                    <Field><input type="text" name="message"  /></Field>
                                    <InputSubmit type="submit" value="Add comment" />
                                </form>
                            </>
                        }
                         <h2 style={{ margin: '2rem 0' }}>Comments</h2>
                        {/*{comments.length === 0
                            ?
                            <p>No comments yet</p>
                            :
                            <ul>
                                {comments.map((elm, idx) => (
                                    <li key={`${elm.userId}-${i}`} style={{border: '1px solid var(--grey3)', padding: '2rem'}}>
                                        <p>{elm.message}</p>
                                        <p>Written by: <span style={{fontWeight: 'bold'}}>{''} {elm.userName}</span></p>
                                        { isCreator(elm.userId) && <ProductCreator>Is Creator</ProductCreator> }
                                    </li>
                                ))}
                            </ul>
                        } */}

                    </article>
                    <aside>
                        <Button target="_blank" bgColor="true" href={url}>Visit URL</Button>
                        <div style={{ marginTop: '5rem' }}>
                            <p style={{ textAlign: 'center' }}>{votes} votes</p>
                            {user && <Button  >Vote</Button>}
                        </div>
                    </aside>
                </section>
                </ProdContainer>
            </>
        </Layout>
    )
}

export default Product