import App from 'next/app'
import firebase, { FirebaseContext } from '../firebase'

import '../styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

const MyApp = ({ Component, pageProps }) => {
  return (
    <FirebaseContext.Provider value={{firebase}}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  )
}

export default MyApp
