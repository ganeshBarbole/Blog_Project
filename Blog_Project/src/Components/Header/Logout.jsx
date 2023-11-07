import React from "react"
import authservice from "../../appwrite/AuthService"
import {useDispatch} from 'react-redux'
import {logOut} from '../../store/authSlice' 

export default function Logout(){
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authservice.logOut().then(() => {
            dispatch(logOut())
        })
    }
    return(
      <button className = 'inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' 
              onClick={logoutHandler}
              >Logout</button>    
)
}