import React, { useEffect, useState } from "react";
import { Button, Container } from "../Components";
import databaseService from "../appwrite/DatabaseService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Post(){
    const[post,setPost] = useState();
    const navigate = useNavigate()
    const {slug} = useParams();

    const userData = useSelector((state) => state.auth.userData)
    const isAuthor = post && userData ? post.$id == userData.$id : false

    useEffect(() => {
        if(slug){
            databaseService.getPost(slug).then((post) => { 
            if(post) setPost(post)
            else navigate("/")
             } )
        }else navigate('/')
    },[slug,navigate])
     
    const deletePost = () => {
        databaseService.deletePost(post.$id).then((status) => {
            if(status){
                databaseService.deleteFile(post.featuredImage)
                navigate("/")
            }
        })
    }
  
    
    return post ? (
        <div className="py-8">
            <Container>
            <div className="w-full flex justify-center relative border rounded-xl p-2">
            <img
                    src= {databaseService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-xl"
                  />

                {isAuthor && (
                    <div className="absolute right-6 top-6">
                     <Link to={`/edit-post/${post.$id}`}>
                       <Button bg-color = "bg-green-500" className="mr-3">
                        Edit
                       </Button>
                       <Button bg-color = "bg-red-500" onclick={deletePost}>
                        Delete
                       </Button>
                     </Link>
                    </div>
                  )}
                  <div className="w-full mb-6">
                   <h1 className="text-2xl font-bold">{post.title}</h1>
                  </div>
                  <div className="browser-css">
                    {parse(post.content)}
                  </div>
                </div>
            </Container>

        </div>
    ) :null;
}