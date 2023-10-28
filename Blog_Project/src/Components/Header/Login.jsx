import React,{useState} from "react";
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {login as authlogin} from '../../store/authSlice'
import {authservice} from '../../appwrite/AuthService'
import {Button,Input,Logo} from '../index'
import {useForm} from 'react-hook-form'

function Login(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error,setError] = useState();
    const {register,handleSubmit} = useForm();

    const login = async(data) => {
        setError(" ")
        try {
           const session = await authservice.login(data);
           if(session){
             const userdata = await authservice.getCurrentUser();
             if(userdata){
                dispatch(authlogin(userdata))
             }
             navigate('/')
           }
            
        } catch (error) {
            setError(error.message)
        }
    }

    return(
        <div className="flex item-center justify-center w-full"> 
        <div className={`w-full mx-auto max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%"/>
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
             <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                 <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                </Link>
            </p>
            {error && <p className="text-center text-red-600 mt-8">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
            <div className="space-y-5">
             <Input 
               label = "Email : "
               placeholder = "Enter your email"
               type = "email"
               {...register("email" , {
                required:true,
                validate:{
                    matchpatern: (value) =>  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                }
               })}
               />

               <Input  
                 label = "Password : "
                 type ="password"
                 placeholder ="Enter your password" 
                 {...register("password",{
                    required:true
                 })}   
                     />

            <Button
            className="w-full"
            type="submit"
            >Sign in </Button>

            </div>


        </form>
        </div>
        </div>
    )
}

export default Login;