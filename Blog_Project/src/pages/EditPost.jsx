import React, { useEffect, useState } from "react";
import { Container,PostForm, Postcard } from "../Components";
import databaseService from "../appwrite/DatabaseService";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost(){
    const [post,setPosts] = useState(null)
    const navigate = useNavigate()
    const {slug} = useParams()
    useEffect(() => {
        if(slug){ 
        databaseService.getPost(slug).then((post) => { 
            if(post){
                setPosts(post)
            }
         }
     ) }else{
                navigate("/")
            }
    
    }, [slug,navigate])

    return(
        <div className="w-full py-8">
        <Container>
        
             <Postcard post={post}/>
            
        </Container>
        </div>
    )
}
