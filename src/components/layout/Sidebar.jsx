import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Sidebar = () => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const execSearch = (e) => {
    e.preventDefault()
    const mySearch = e.target.search_field.value
    navigate(`/search/${mySearch}`, { replace: true })
  }
  return (
    <aside className="lateral">
        <div className="search">
            <h3 className="title">Buscador</h3>
            <form onSubmit={execSearch}>
                <input type="text" name='search_field'/>
                <input type='submit' id="search" value = 'Buscar'/>
            </form>
        </div>

    {/* <div className="add">
            <h3 className="title">Añadir pelicula</h3>
            <form action="">
                <input type="text" placeholder="titulo"/>
                <textarea placeholder="descripcion"></textarea>
                <button type="submit">Guardar</button>
            </form>
        </div> */}
    </aside>)
}
