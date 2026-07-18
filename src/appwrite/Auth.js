import { Account, Client, ID } from 'appwrite'
import config from '../config/config'
import profileService from './profile'

export class Authservice {
    client = new Client()
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            //    console.log("account created succesfully", userAccount)

            if (userAccount) {
                await this.login({ email, password })
                await profileService.createUserProfile(
                    {
                        $id: userAccount.$id,
                        name: userAccount.name,
                        email: userAccount.email
                    }
                )
                await this.sendverificationEmail()
                await this.logout()
                return userAccount
            }
            return userAccount
        } catch (error) {
            console.log('create account error', error.message)
        }
    }

    async sendverificationEmail() {
        try {
            return await this.account.createVerification(
                `${config.appUrl}/verify-email`
            )
        } catch (error) {
            console.log("email verification error: ", error.message)
            throw error
        }
    }
    async resendVerificationEmail() {
        try {
            return await this.account.createVerification(
                `${config.appUrl}/verify-email`
            )
        } catch (error) {
            throw error
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log('login error', error.message, 'code', error.code)
            throw error
        }
    }

    async verifyEmail(userId, secret) {
        try {
            return await this.account.updateVerification(userId, secret);
        } catch (error) {
            console.log("Email verification failed:", error.message);
            throw error;
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