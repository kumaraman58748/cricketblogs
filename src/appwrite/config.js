import conf from "../conf/conf.js"
import {Client,Databases,Storage,ID} from "appwrite";
class Service{
    client=new Client()
    databases
    bucket
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }
    async createPost({ title, slug, content, featuredimg, status }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimg,
                    status,
                }
            )
        } catch (error) {
            console.error("Appwrite service :: createPost", error);
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.error("Appwrite service :: getPost", error);
            return false
        }
    }
    async getPosts() {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                []
            )
        } catch (error) {
            console.error("Appwrite service :: getPosts", error);
            return false
        }
    }
    async updatePost(slug, { title, content, featuredimg, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimg,
                    status,
                }
            )
        } catch (error) {
            console.error("Appwrite service :: updatePost", error);
        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true
        } catch (error) {
            console.error("Appwrite service :: deletePost", error);
            return false
        }
    }
    async getFilePreview(fileId) {
       try {
         return await this.bucket.getFilePreview(conf.appwriteBucketId, fileId)
       } catch (error) {
            throw error;
       }
    }
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.error("Appwrite service :: uploadFile", error);
            return false
        }
    }
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.error("Appwrite service :: deleteFile", error);
            return false
        }
    }
}
const dbservice=new Service();
export default dbservice;