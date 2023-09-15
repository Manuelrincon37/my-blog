import { useEffect, useState } from 'react'
import { Global } from '../../helpers/Global'
import { Petition } from '../../helpers/Petition'
import { useParams } from 'react-router-dom'

export const Article = () => {
  const params = useParams()
  const [article, setArticle] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getArticle()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getArticle = async () => {
    const url = Global.url + `/article/${params.id}`
    // eslint-disable-next-line no-unused-vars
    const { data, loading } = await Petition(url, 'GET')

    if (data.status === 'success') {
      setArticle(data.article)
    }
    setLoading(false)
  }
  return (
    <>
    {loading
      ? <h2>Cargando...</h2>
      : (
          article
            ? <div className='jumbo'>
                <div className="mask">
                  {article.img && < img src = {Global.url + `img/${article.img}`}/>}
                  {!article.img && <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" alt="article-img" />}
                </div>
                <h1>{article.title}</h1>
                <span>{article.date}</span>
                <p>{article.content}</p>
              </div>
            : (<h2>No hay articulos</h2>)
        )}

</>
  )
}
