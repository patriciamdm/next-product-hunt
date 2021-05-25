import React, { useEffect, useState, useContext } from 'react'
import { FirebaseContext } from '../firebase'


const useProducts = order => {

    const [products, setProducts] = useState([])

    const { firebase } = useContext(FirebaseContext)

    useEffect(() => {
    const getProducts = () => firebase.db.collection('products').orderBy(order, 'desc').onSnapshot(manageSnapshot)
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

    return {products}
}

export default useProducts