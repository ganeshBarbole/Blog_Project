import React, { useEffect, useState } from "react";
import databaseService from "../appwrite/DatabaseService";
import { Container,Postcard } from "../Components";
import { useNavigate } from "react-router-dom";

export default function AllPosts(){
    const[posts,setPosts] = useState()
    
    useEffect(() => {} , [])
    databaseService.getPosts([]).then((posts) => { 
    if(posts){
        setPosts(posts.documents)
    }}
    )
 return(
    <div className="w-full py-8">
        <Container>
            <div className="flex flex-wrap">
              {posts.map((post) => (
                <div key={post.$id}  className="p-2 w-1/4">
                   <Postcard {...post}/>
                </div>
              ))}
            </div>
        </Container>
    </div>
 )
}
