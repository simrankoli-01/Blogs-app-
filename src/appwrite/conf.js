import config from '../config/config'
import { Client, Databases, ID, Query, Storage } from 'appwrite'

export class Service {
    client = new Client()
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, content, featuredImage, userId, status, username}) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    content,
                    featureImg: featuredImage,
                    userId,
                    username,
                    status
                }
            )
        } catch (error) {
             console.log('create post error', error.message, error.code)
             throw error
        }
    }

    async updatePost (slug, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featureImg: featuredImage,
                    status
                }
            )
        } catch (error) {
             console.log('something went wrong while updating post')
        }
    }

    async deletePost (slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log('something went wrong while deleting post')
        }
    }

    async getPost (slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log('something went wrong while getting post')
        }
    }

    async getPosts (queries = [Query.equal('status', 'active')]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            )
        } catch (error) {
          console.log('something went wrong while getting posts')
          return false
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('something went wrong while file uploading..', error)
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                config.appwriteBucketId,
                    fileId
            )
        } catch (error) {
            console.log('something went wrong while file deleting...', error)
            return false
        }
    }

    getFileView(fileId){
        return this.bucket.getFileView(
            config.appwriteBucketId,
            fileId
        ).toString()
    }
}
const service = new Service()

export default service