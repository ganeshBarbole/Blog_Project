import config from "../config/config";
import { Client, Account,ID,Databases,Storage,Query } from "appwrite";


 class DatabaseService{
 client = new Client();
 databases;
 bucket;

 constructor(){
    this.client
    .setEndpoint(config.appwriteUrl)
    .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
 }

 async createPost({title,slug,content,featuredImage,status,userId}){
    try {
        return await this.databases.createDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId
            }
        )
    } catch (error) {
        console.log("Appwrite error :: creatAccount :: error",error)
    }
 }

 async updatePost(slug,{title,content,featuredImage,status}){
     try {
        return await this.databases.updatePost(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status
            }
        )
     } catch (error) {
        console.log("Appwrite error :: updatePost :: error",error)
     }
 }

 async deletePost(slug){
     try {
        await this.databases.deleteDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        )
        return true;
     } catch (error) {
        console.log("Appwrite error :: deletePost :: error",error);
        return false;
     }
 }

 async getPost(slug){
    try {
        return await this.databases.getDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        )
    } catch (error) {
        console.log("Appwrite error :: getPost :: error",error);
        return false;
    }
 }

 async getPosts(queris = [Query.equal("status",[  "active"])]){
    try {
        return await this.databases.getPosts(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            queris
        )
    } catch (error) {
        console.log("Appwrite error :: getPosts :: error",error);
        return false;
    }
 }


 async createFile(file){
    try {
        return await this.bucket.createFile(
            config.appwriteBucketId,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log("Appwrite error :: createFile :: error",error);
        return false;
    }
 }

 async deletePost(fileId){
    try {
        await this.bucket.deleteFile(
            config.appwriteBucketId,
            fileId
        )
        return true;
    } catch (error) {
        console.log("Appwrite error :: deleteFile :: error",error);
        return false;
    }
 }

 getFilePreview(){
    return this.bucket.getFilePreview(
        config.appwriteBucketId,
        fileId
    )
 }

}

const databaseService = new DatabaseService ();
export default databaseService;