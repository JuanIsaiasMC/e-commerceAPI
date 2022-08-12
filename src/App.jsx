import { useState } from 'react'
import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Home, Login, Purchases, ProductDetail } from './pages'
import { NavBar } from './components'
import LoadingScreen from './components/LoadingScreen'
import { useSelector } from 'react-redux'
import ProtectedRoutes from './components/ProtectedRoutes'
import Cart from './components/Cart'


function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <HashRouter>
      <NavBar />
      {/* el operador && consta de dos partes izquierda que es la condicion y depues es la respuesta o resultado a ejecutarse de la condicion */}
      {isLoading && <LoadingScreen />}
      <Routes>
        <Route path='/' element={<Home />} />
        {/* en el path se puede cualquier string pero el element si debe hacer match con un componente exportado  */}
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/login' element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/purchases' element={<Purchases />} />
        </Route>
      </Routes>
    </HashRouter>

  )
}

export default App
