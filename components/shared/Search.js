import React, { useState } from 'react'
import Router from 'next/router'
import styled from '@emotion/styled'


const InputText = styled.input`
    border: 1px solid var(--gray3);
    padding: 1rem;
    min-width: 300px;
`

const InputButton = styled.button`
    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 4rem;
    background-image: url(/static/img/buscar.png);
    position: absolute;
    right: 1rem;
    top: 1px;
    background-color: white;
    border: none;
    text-indent: -9999px;

    &:hover {
        cursor: pointer;
    }
`

const Search = () => {
    
    const [search, setSearch] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        if (search.trim() === '') return
        Router.push({pathname: '/search', query: {q: search}})
    }

    return (
        <form style={{position: 'relative'}} onSubmit={handleSubmit}>
            <InputText type="text" placeholder="Search products" onChange={e => setSearch(e.target.value.toLowerCase())}/>
            <InputButton type="submit">Search</InputButton>
        </form>
    )
}

export default Search