import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
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


const Search = () => {
  
  const router = useRouter()
  const { query: { q } } = router

  const { products } = useProducts('created')

  const [displayProds, setDisplayProds] = useState([])
  
  useEffect(() => {
    const filteredProds = products.filter(elm => elm.name.toLowerCase().includes(q) || elm.description.toLowerCase().includes(q))
    setDisplayProds(filteredProds)
  }, [q, products])

  return (
    <div>
      <Layout>
        <section style={{ backgroundColor: 'var(--gray5)' }}>
          <Container>
            {displayProds.length === 0
              ?
              <p>No products found.</p>
              :
              <ul style={{ backgroundColor: 'white' }}>
                {displayProds.map(elm => <ProductCard key={elm.id} product={elm}/>)}
              </ul>
            }
          </Container>
        </section>
      </Layout>
    </div>
  )
}

export default Search