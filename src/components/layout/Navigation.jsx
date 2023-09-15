import { NavLink } from 'react-router-dom'
export const Navigation = () => {
  return (
    <nav className="nav">
        <ul>
            <li><NavLink to="/index">Inicio</NavLink></li>
            <li><NavLink to="/articles">Articulos</NavLink></li>
            <li><NavLink to="/create">Crear Articulo</NavLink></li>
            <li><NavLink to="#">Contacto</NavLink></li>
        </ul>
    </nav>)
}
