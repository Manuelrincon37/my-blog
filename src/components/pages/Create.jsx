import { useForm } from '../../hooks/useForm'
import { useState } from 'react'
import { Petition } from '../../helpers/Petition'
import { Global } from '../../helpers/Global'

export const Create = () => {
  // eslint-disable-next-line no-unused-vars
  const { form, sent, change } = useForm({})
  const [result, setResult] = useState('no_enviado')

  const saveArticle = async (e) => {
    e.preventDefault()

    // Ger form data
    const newArticle = form

    // Save article on DB

    const { data } = await Petition(Global.url + 'create', 'POST', newArticle)

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

      const { data: upload } = await Petition(Global.url + `upload-img/${data.article._id}`, 'POST', formData, true)
      if (upload.status === 'success') {
        setResult('guardado')
      } else {
        setResult('error')
      }
    }
  }

  return (
    <div className="jumbo">
      <h1>Crear articulos</h1>
      <h3>Formulario para crear un articulo</h3>

      <strong>{result === 'guardado' ? <h4>Articulo guardado con exito</h4> : ''}</strong>
      <strong>{result === 'error' ? <h4>Los datos proporcionados son incorrectos</h4> : ''}</strong>
      <strong>{result === 'guardado-noimg' ? <h4>Articulo guardado con exito ( No File )</h4> : ''}</strong>

      {/* Mount form  */}
      <form className='form' onSubmit={saveArticle}>

        <div className='form-group'>
            <label htmlFor='title'>Titulo</label>
            <input type="text" name="title" onChange={change} />
        </div>

        <div className='form-group'>
            <label htmlFor='content'>Contenido</label>
            <textarea type="text" name="content" onChange={change}/>
        </div>

        <div className='form-group'>
            <label htmlFor='file0'>Imagen</label>
            <input type="file" name="file0" id='file' />
        </div>

        <input className='btn btn-succes' type="submit" value="Guardar"/>

      </form>

    </div>
  )
}
