import { Account, Client, ID } from 'appwrite'
import config from '../config/config'

export class Authservice {
    client = new Client()
    account;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}) {
        try {
           const userAccount =  await this.account.create(ID.unique(), email, password, name)
           console.log("account created succesfully", userAccount)

           if (userAccount) {
            console.log("attempting login with", email)
             return this.login({email, password})
           } else {
            return userAccount
           }

        } catch (error) {
             console.log('create account error', error.message)
        }
    }

    async login({email, password}) {
        try {
           return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
             console.log('login error', error.message, 'code' , error.code)
             throw error
        }
    }

    async isLogedin() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("please create an account")
            return null
        }

        return null
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}

const authservice = new Authservice()

export default authservice