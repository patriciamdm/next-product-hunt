import React from 'react'
import Link from 'next/link'
import styles from '../../styles/Header.module.css'
import styled from '@emotion/styled'

import Search from '../shared/Search'
import Button from '../shared/Button'
import Navbar from './Navbar'


const Logo = styled.p`
    color: var(--orange);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
`


const Header = () => {

    const user = false

    return (
        <header className={styles.header}>
            <section className={styles.container}>   
                <div className={styles.head}>
                    <Link href="/" passHref><Logo>P</Logo></Link>
                    <Search />
                    <Navbar />
                </div>
                <div className={styles.buttons}>
                    {user
                        ?
                        (<>
                            <p style={{marginRight: '2rem'}}>Hola: user</p>
                            <Button bgColor="true">Log out</Button>
                        </>)
                        :
                        (<>
                            <Link href="/log-in" passHref><Button bgColor="true">Log in</Button></Link>
                            <Link href="/sign-up"><Button>Sign up</Button></Link>
                        </>)
                    }
                </div>
            </section>
        </header>
    )
}

export default Header



