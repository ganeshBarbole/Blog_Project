import React, { useEffect, useState } from "react";
import { Container,Postcard } from "../Components";
import databaseService from "../appwrite/DatabaseService";

export default function Home(){
    const [posts , setPosts] = useState([])
    useEffect(() => {
        databaseService.getPosts().then((posts) => {
            if(posts){
                setPosts(posts.documents)
            }
        })
    }, [])
 
    if(posts.length === 0){
        return( 
        <div className="w-full py-8 mt-4 text-center">
            <Container>
         <div className="flex flex-wrap">
          <div className="w-full p-2">
           <h1 className="text-2xl hover:text-gray-500 font-bold ">
            Login to read Posts
           </h1>
          </div>
         </div>
         </Container>
        </div>
   ) }

    return(
        <div className="w-full py-8">
          <Container>
            <div className="flex flex-wrap">
            {posts.map((post) => (
                 <div key={post.$id} className='p-2 w-1/4'>
                <Postcard {...posts}/>
                </div>
            ))}
            </div>
          </Container>
        </div>
    )
} 
