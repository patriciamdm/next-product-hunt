import React, { useEffect, useState, useContext } from 'react'
import { FirebaseContext } from '../firebase'
import styled from '@emotion/styled'

import Layout from '../components/layout/Layout'
import ProductCard from '../components/layout/ProductCard'


const Container = styled.article`
max-width: 1200px;
width: 95%;
padding: 5rem 0;
margin: 0 auto;
`


const Home = () => {
  
  const [products, setProducts] = useState([])

  const { firebase } = useContext(FirebaseContext)
  
  useEffect(() => {
    const getProducts = () => firebase.db.collection('products').orderBy('created', 'desc').onSnapshot(manageSnapshot)
    getProducts()
    // eslint-disable-line
  }, [])

  function manageSnapshot(snap) {
    const products = snap.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
    setProducts(products)
  }

  return (
    <div>
      <Layout>
        <section style={{ backgroundColor: 'var(--gray5)' }}>
          <Container>
            <ul style={{ backgroundColor: 'white' }}>
            {products.map(elm => <ProductCard key={elm.id} product={elm}/>)}
            </ul>
          </Container>
        </section>
      </Layout>
    </div>
  )
}

export default Home