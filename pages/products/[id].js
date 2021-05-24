import React, { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { FirebaseContext } from '../../firebase'

import Layout from '../../components/layout/Layout'
import Error404 from '../../components/shared/404'

const Product = () => {
    
    const [product, setProduct] = useState({})
    const [error, setError] = useState(false)

    const { comments, created, company, name, description, image, url, votes } = product

    const { firebase } = useContext(FirebaseContext)
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
            <section>
                <h1 style={{ marginTop: '5rem', textAlign: 'center' }}>{name}</h1>
            </section>
        </Layout>
    )
}

export default Product