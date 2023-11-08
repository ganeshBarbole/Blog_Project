import React from "react";
import databaseService from "../appwrite/DatabaseService";
import {Link} from 'react-router-dom'

 export default function Postcard({$id,title,feacturedImage}){
    return(
      <Link to = {`/Post/${$id}`}>
        <div className="w-full bg-gray-100 rounded-xl p-4">
            <div className="w-full justify-center mb-4">
              <img src = {databaseService.getFilePreview(feacturedImage)} alt={title} 
              className="rounded-lg"/>
            </div>
            <h2 className="text-xl font-bold">{title}</h2>
        </div>
      </Link>
    )
}