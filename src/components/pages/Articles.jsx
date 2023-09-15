import { useState, useEffect } from 'react'
import { Global } from '../../helpers/Global'
import { Petition } from '../../helpers/Petition'
import { List } from './List'

export const Articles = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getArticles()
  }, [])

  const getArticles = async () => {
    const url = Global.url + 'articles'
    // eslint-disable-next-line no-unused-vars
    const { data, loading } = await Petition(url, 'GET')

    if (data.status === 'success') {
      setArticles(data.articles)
    }
    setLoading(false)
  }

  return (
    <>
        {loading
          ? <h2>Cargando...</h2>
          : (
              articles.length >= 1
                ? <List articles={articles}
                        setArticles={setArticles}/>
                : (<h2>No hay articulos</h2>)
            )}

    </>
  )
}
