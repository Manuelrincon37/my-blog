import { Link } from 'react-router-dom'
export const Index = () => {
  return (
    <div className="jumbo">
        <h1>Bienvenido al blog creado con react</h1>
        <p>blog desarrollado con MERN Stack (MongoDB, Express, React, Node)</p>
        <Link to={'/articles'} className='button'>Ver articulos</Link>
    </div>
  )
}
