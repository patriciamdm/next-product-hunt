import React from 'react'
import Link from 'next/link'
import styles from '../../styles/Header.module.css'

import Search from '../shared/Search'
import Navbar from './Navbar'

const Header = () => {
    return (
        <header >
            <div classname={styles.header}>
                <p>P</p>
                <Search />
                <Navbar />
            </div>
            <div>
                <p>Hola: user</p>
                <button type="button">Log out</button>
                <Link href="/">Log in</Link>
                <Link href="/">Sign up</Link>
            </div>
        </header>
    )
}

export default Header