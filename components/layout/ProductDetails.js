import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import styles from '../../styles/ProductDetails.module.css'
import styled from '@emotion/styled'


const Title = styled.a`
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    :hover {
        cursor: pointer;
    }
`

const Comments = styled.div`
    margin-top: 2rem;
    display: flex;
    align-items: center;
    figure {
        margin: 0 2rem 0 0;
        display: flex;
        align-items: center;
        border: 1px solid var(--gray3);
        padding: .3rem 1rem;
    }
    img {
        width: 2rem;
        margin-right: 2rem;
    }
    p {
        font-size: 1.6rem;
        margin-right: 1rem;
        font-weight: 700;
        &:last-of-type {
            margin: 0;
        }
    }
`


const ProductDetails = ({ product }) => {
    
    const { id, comments, created, company, name, description, image, url, votes } = product

    return (
        <li className={styles.product}>
            <section className={styles.description}>
                <figure style={{margin: '0'}}>
                    <img style={{ width: '200px' }} src={image}/>
                </figure>
                <figcaption>
                    <Title>{name}</Title>
                    <p className={styles.text}>{description}</p>
                    <Comments>
                        <figure>
                            <img src="/static/img/comentario.png" />
                            <p>{comments.length} comments</p>
                        </figure>
                    </Comments>
                    <p>Published: {formatDistanceToNow(new Date(created))} ago</p>
                </figcaption>
            </section>

            <section className={styles.votes}>
                <div sytle={{fontSize: '2rem'}}>&#9650;</div>
                <p className={styles.votesn}>{votes}</p>
            </section>
        </li>
    )
}

export default ProductDetails