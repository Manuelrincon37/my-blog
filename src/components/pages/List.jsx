import { Global } from '../../helpers/Global'
import { Petition } from '../../helpers/Petition'
import { Link } from 'react-router-dom'

export const List = ({ articles, setArticles }) => {
  const deleteArticle = (id) => {
    const { confirm } = window

    confirm('¿Estas seguro de borrar este articulo?') &&
      Petition(Global.url + `delete-article/${id}`, 'DELETE')
        .then(({ data }) => {
          if (data.status === 'success') {
            setArticles(articles.filter((article) => article._id !== id))
          }
        })
  }

  return (
    articles.map((article) => {
      return (
        <article key={article._id} className="article-item">

            <div className="mask">
                {article.img && < img src = {Global.url + `img/${article.img}`}/>}
                {!article.img && <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" alt="article-img" />}
            </div>

            <div className="data">
                <h3 className="title"><Link to={`/article/${article._id}`}>{article.title}</Link></h3>
                <p className="description">{article.content}</p>
                <Link to={`/edit/${article._id}`} className="edit">Editar</Link>
                <button className="delete" onClick={() => { deleteArticle(article._id) }}>Borrar</button>
            </div>

        </article>
      )
    })
  )
}
