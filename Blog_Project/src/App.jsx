import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import authservice from './appwrite/AuthService'
import authSlice, { logOut, login } from './store/authSlice'
import './App.css'

function App() {
 const [loading,setLoading] = useState(true);
 const dispatch = useDispatch()

useEffect(() => {
  authservice.getCurrentUser()
  .then((userData) => {
    if(userData){
      dispatch(login({userData}))
    }
    else{
      dispatch(logOut())
    }
  })
  .finally(() => {setLoading(false)})
},[])


  return (
    <>
     <div>
      <div>
      <Header/>
      <Outlet/>
      <Footer/>
      </div>
      </div>
    </>
  )
}

export default App
