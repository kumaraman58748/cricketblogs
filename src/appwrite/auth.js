import conf from "../conf/conf.js";
import { Client, Account,ID } from "appwrite";
class Authservice {
    client=new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account=new Account(this.client);
    }
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
    
            if (userAccount) {
                // ✅ Log in the user first
                await this.account.createEmailPasswordSession(email, password);
                console.log("User logged in successfully!");
    
                return userAccount; 
            } else {
                return null;
            }
        } catch (error) {
            console.error("Appwrite service :: createAccount", error);
            throw error;
        }
    }
    
    
    async login({ email, password }) {
        try {
            // ✅ Check for existing session
            const existingSession = await this.checkSession();
            if (existingSession) {
                console.log("Existing session detected. Deleting old session...");
                await this.logout(); // Delete old session before logging in
            }
    
            // ✅ Now create a new session
            const login = await this.account.createEmailPasswordSession(email, password);
            const user = await this.getCurrentuser();
    
            // ✅ Prevent login if email is not verified
            // if (!user.emailVerification) {
            //     await this.logout();
            //     throw new Error("Please verify your email before logging in.");
            // }
    
            return user;
        } catch (error) {
            console.error("Appwrite service :: login", error);
            throw error;
        }
    }
    
    async getCurrentuser(){
        try {
            return await this.account.get();
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error("User is not authenticated. Please log in.");
                // Handle the unauthorized error (e.g., redirect to login, show a message, etc.)
                  // or throw a custom error
            } else {
                console.error("Appwrite service :: getCurrentUser", error);// rethrow other unexpected errors
            }
    }
     return null
    }
    async sendVerificationEmail() {
        try {
            await this.account.createVerification("http://localhost:5173/verify");
            console.log("Verification email sent!");
        } catch (error) {
            console.error("Appwrite service :: sendVerificationEmail", error);
            throw error;
        }
    }

    // ✅ Verify email from the verification link
    async verifyEmail(userId, secret) {
        try {
            await this.account.updateVerification(userId, secret);
            console.log("Email verified successfully!");
        } catch (error) {
            console.error("Appwrite service :: verifyEmail", error);
            throw error;
        }
    }
    async  logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Appwrite service :: logout", error);
        }
      }
      async checkSession() {
        try {
            const session = await this.account.getSession('current');
            console.log("Active session found:", session);
            return session;
        } catch (error) {
            console.log("No active session found or session has expired.", error.message);
            return null;
        }
    }
    
}
const authservice=new Authservice();
export default authservice;