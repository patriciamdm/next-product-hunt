import React, { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { FirebaseContext } from '../../firebase'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import styled from '@emotion/styled'

import Layout from '../../components/layout/Layout'
import Error404 from '../../components/shared/404'
import {Field, InputSubmit, ErrorMsg} from '../../components/shared/Form'
import Button from '../../components/shared/Button'


const ProdContainer = styled.section`
    margin: 0 3rem;
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

const ListElm = styled.li`
    border: 1px solid var(--gray3);
    padding: 0 2rem;
    margin: 1rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`


const Product = () => {
    
    const [checkDB, setCheckDB] = useState(true)
    const [product, setProduct] = useState({})
    const [error, setError] = useState(false)
    const [errorMsg, setErrotMsg] = useState(false)
    const [comment, setComment] = useState({})

    const { comments, created, company, name, description, image, url, votes, creator } = product

    const { firebase, user } = useContext(FirebaseContext)
    const router = useRouter()
    const { query: { id } } = router

    useEffect(() => {
        if (id && checkDB) {
            const getProduct = async () => {
                const prodQuery = await firebase.db.collection('products').doc(id)
                const product = await prodQuery.get()
                if (product.exists) {
                    setProduct(product.data())
                    setCheckDB(false)
                }
                else {
                    setError(true)
                    setCheckDB(false)
                }
            }
            getProduct()
        }
    }, [id, checkDB])

    const voteProduct = () => {
        if (!user) router.push('/log-in')
        if (votes.includes(user.uid)) {
            setErrotMsg('You already voted this product')
            setTimeout(() => setErrotMsg(false), 2500)
            return
        }
        const newVotes = [...votes, user.uid]
        firebase.db.collection('products').doc(id).update({votes: newVotes})
        setProduct({ ...product, votes: newVotes })
        setCheckDB(true)
    }

    const commentChange = e => setComment({ ...comment, [e.target.name]: e.target.value })
    
    const addComment = e => {
        e.preventDefault()
        if (!user) router.push('/log-in')
        comment.userId = user.uid
        comment.userName = user.displayName
        const newComments = [...comments, comment]
        firebase.db.collection('products').doc(id).update({comments: newComments})
        setProduct({ ...product, comments: newComments })
        setCheckDB(true)
    }

    const isCreator = id => (creator.id == id) ? true : false


    if (error) return <Layout><Error404 text="Product doesn't exist." /></Layout>
    else if (Object.keys(product).length === 0) return <Layout><h2 style={{marginTop: '5rem', textAlign: 'center'}}>Loading product...</h2></Layout>
    else return (
        <Layout>
            <>
                <h1 style={{marginTop: '5rem', textAlign: 'center'}}>{name}</h1>
                <ProdContainer>
                    <article>
                        
                        <img src={image} style={{maxWidth: '100%'}} />
                        <p>{description}</p>
                        {user
                            &&
                            <>
                                <h2>Add your comment</h2>
                                <form onSubmit={addComment}>
                                    <Field><input type="text" name="message" onChange={commentChange} /></Field>
                                    <InputSubmit type="submit" value="Add comment" />
                                </form>
                            </>
                        }
                        <h2 style={{ margin: '2rem 0' }}>Comments</h2>
                        {comments.length === 0
                            ?
                            <p>No comments yet</p>
                            :
                            <ul>
                                {comments.map((elm, idx) => (
                                    <ListElm key={`${elm.userId}-${idx}`}>
                                        <div>
                                            <p>{elm.message}</p>
                                            <p>Written by: <span style={{fontWeight: 'bold'}}>{''} {elm.userName}</span></p>
                                        </div>
                                        {isCreator(elm.userId) && <ProductCreator>Is Creator</ProductCreator>}
                                    </ListElm>
                                ))}
                            </ul>
                        }
                    </article>
                    <aside>
                        <p>Published: {formatDistanceToNow(new Date(created))} ago</p>
                        <p>By: {creator.name} from {company}</p>
                        <Button target="_blank" bgColor="true" href={url}>Visit URL</Button>
                        <div style={{ marginTop: '5rem' }}>
                            <p style={{ textAlign: 'center' }}>{votes.length} votes</p>
                            {(user && errorMsg) && <ErrorMsg>{errorMsg}</ErrorMsg>}
                            {user && <Button onClick={voteProduct} >Vote</Button>}
                        </div>
                    </aside>
                </ProdContainer>
            </>
        </Layout>
    )
}

export default Product