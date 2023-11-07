import config from "../config/config";
import { Client, Account,ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){
        try {
           const userAccount = await this.account.create(ID.unique(),email,password,name);
           if (userAccount){
            //login method
            return this.logIn({email,password});
           } else {
             return userAccount;
           }
        } catch (error) {
            throw error;
        }
    }

    async logIn({email,password}){
        try {
            return await this.account.createEmailSession(email,password);
        } catch (error) {
            console.log("Appwrite error :: logIn :: error",error)
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite error :: getCurrentUser :: error",error)
        }
        return null;
    }

    async logOut(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite error :: logOut :: error",error)
        }
    }
}

const authservice = new AuthService();

export default authservice;