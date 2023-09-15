import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Index } from '../components/pages/Index'
import { Articles } from '../components/pages/Articles'
import { Article } from '../components/pages/Article'
import { Create } from '../components/pages/Create'
import { Edit } from '../components/pages/Edit'
import { Search } from '../components/pages/Search'
import { Header } from '../components/layout/Header'
import { Navigation } from '../components/layout/Navigation'
import { Sidebar } from '../components/layout/Sidebar'
import { Footer } from '../components/layout/Footer'

export const MainRouter = () => {
  return (
    <BrowserRouter>
    {/* Layout */}
    <Header/>
    <Navigation/>
    {/* Main content & routes */}
    <section className='content' id='content'>
        <Routes>
            <Route path='/' element={<Index/>} />
            <Route path='/index' element={<Index/>} />
            <Route path='/articles' element={<Articles/>} />
            <Route path='/article/:id' element={<Article/>} />
            <Route path='/create' element={<Create/>} />
            <Route path='/edit/:id' element={<Edit/>} />
            <Route path='/search/:element' element={<Search/>} />
            {/* Define route 404 */}
            <Route path='*' element={<h1>Error 404 Page not Found</h1>} />
        </Routes>
    </section>
    {/* Aside */}
    <Sidebar/>
    {/* Footer */}
    <Footer/>
    </BrowserRouter>
  )
}
