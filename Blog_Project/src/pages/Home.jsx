import React, { useEffect, useState } from "react";
import { Container,Postcard } from "../Components";
import databaseService from "../appwrite/DatabaseService";

export default function Home(){
    const [posts , setPosts] = useState()
    useEffect(() => {
        databaseService.getPosts().then((posts) => {
            if(posts){
                setPosts(posts)
            }
        })
    }, [])
 
    if(posts.length === 0){
        <div className="w-full py-8 text-center">
         <div className="flex flex-wrap">
          <div className="w-full p-2">
           <h1 className="text-2xl hover:text-gray-500">
            Login to read Posts
           </h1>
          </div>
         </div>
        </div>
    }

    return(
        <div className="w-full py-8">
          <Container>
            <div className="flex flex-wrap">
            {posts.map((post) => (
                <Postcard {...posts}/>
            ))}
            </div>
          </Container>
        </div>
    )
} 
