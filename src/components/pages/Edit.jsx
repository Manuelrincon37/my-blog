import { useForm } from '../../hooks/useForm'
import { Petition } from '../../helpers/Petition'
import { Global } from '../../helpers/Global'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const Edit = () => {
  // eslint-disable-next-line no-unused-vars
  const { form, sent, change } = useForm({})
  const [result, setResult] = useState('no_enviado')
  const [article, setArticle] = useState([])
  const params = useParams()

  const editArticle = async (e) => {
    e.preventDefault()

    // Ger form data
    const newArticle = form

    // Send data
    const { data } = await Petition(Global.url + `edit-article/${params.id}`, 'PUT', newArticle)

    if (data.status === 'success') {
      setResult('guardado')
    } else {
      setResult('error')
    }

    const fileImput = document.querySelector('#file')

    if (data.status === 'success' && fileImput.files[0]) {
      setResult('guardado')
      // Upload img

      const formData = new FormData()
      formData.append('file0', fileImput.files[0])
      console.log(data.editedArticle._id)

      const { data: upload } = await Petition(Global.url + `upload-img/${data.editedArticle._id}`, 'POST', formData, true)
      if (upload.status === 'success') {
        setResult('guardado')
      } else {
        setResult('error')
      }
    }
  }
  const getArticle = async () => {
    const url = Global.url + `/article/${params.id}`
    const { data } = await Petition(url, 'GET')

    if (data.status === 'success') {
      setArticle(data.article)
    }
  }

  useEffect(() => {
    getArticle()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="jumbo">
      <h1>Editar articulo</h1>
      <h3>Formulario para editar: {article.title}</h3>

      <strong>{result === 'guardado' ? <h4>Articulo guardado con exito</h4> : ''}</strong>
      <strong>{result === 'error' ? <h4>Los datos proporcionados son incorrectos</h4> : ''}</strong>
      <strong>{result === 'guardado-noimg' ? <h4>Articulo guardado con exito ( No File )</h4> : ''}</strong>

      {/* Mount form  */}
      <form className='form' onSubmit={editArticle}>

        <div className='form-group'>
            <label htmlFor='title'>Titulo</label>
            <input type="text" name="title" onChange={change} defaultValue = {article.title} />
        </div>

        <div className='form-group'>
            <label htmlFor='content'>Contenido</label>
            <textarea type="text" name="content" onChange={change} defaultValue = {article.content}/>
        </div>

        <div className='form-group'>
            <label htmlFor='file0'>Imagen</label>
            <div className="mask">
              {article.img && < img src = {Global.url + `img/${article.img}`}/>}
              {!article.img && <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" alt="article-img" />}
            </div>
            <input type="file" name="file0" id='file' />
        </div>

        <input className='btn btn-succes' type="submit" value="Guardar"/>

      </form>

    </div>
  )
}
