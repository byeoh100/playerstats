import { useEffect, useState } from 'react'
import './App.css'
import { Outlet, useLoaderData } from 'react-router-dom'
import Navigation from './components/Navigation'
import { api } from './utilities'

function App() {
  const [user, setUser] = useState(useLoaderData())

  const test_connection = async () => {
    let response = await api.get("test/")
    console.log(response.data)
  }

  useEffect(() => {
    test_connection()
  }, [])

  return (
    <>
      <Navigation user={user} setUser={setUser}/>
      <Outlet context={{ user, setUser }}/>
    </>
  )
}

export default App
