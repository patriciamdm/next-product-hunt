import Layout from '../components/layout/Layout'
import styles from '../styles/Home.module.css'

const Home =() => {
  return (
    <div>
      <Layout>
        <h1 className={styles.heading}>Hello!</h1>
      </Layout>
    </div>
  )
}

export default Home