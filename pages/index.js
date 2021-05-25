import React from 'react'
import styled from '@emotion/styled'

import useProducts from '../hooks/useProducts'
import Layout from '../components/layout/Layout'
import ProductCard from '../components/layout/ProductCard'


const Container = styled.article`
max-width: 1200px;
width: 95%;
padding: 5rem 0;
margin: 0 auto;
`


const Home = () => {
  
  const { products } = useProducts('created')

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