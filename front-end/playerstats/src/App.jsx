import { useState } from 'react'
import './App.css'
import { Outlet, useLoaderData } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

function App() {
  const [user, setUser] = useState(useLoaderData())

  return (
    <>
      <Navigation user={user} setUser={setUser}/>
      <Outlet context={{ user, setUser }}/>
      <Footer />
    </>
  )
}

export default App
