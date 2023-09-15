import { useState, useEffect } from 'react'
import { Global } from '../../helpers/Global'
import { Petition } from '../../helpers/Petition'
import { List } from './List'
import { useParams } from 'react-router-dom'

export const Search = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const params = useParams()

  useEffect(() => {
    getArticles()
  }, [params])

  const getArticles = async () => {
    const url = Global.url + `search/${params.element}`
    // eslint-disable-next-line no-unused-vars
    const { data, loading } = await Petition(url, 'GET')
    console.log(data)

    if (data.status === 'success') {
      setArticles(data.foundArticles)
    } else {
      setArticles([])
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
                : (<h2>No se encontraron articulos para mostrar</h2>)
            )}

    </>
  )
}
