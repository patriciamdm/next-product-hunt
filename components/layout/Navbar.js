import React from 'react'
import Link from 'next/link'


const Navbar = () => {
    return (
        <nav>
            <Link href="/">Home</Link>
            <Link href="/">Popular</Link>
            <Link href="/">New product</Link>
        </nav>
    )
}

export default Navbar