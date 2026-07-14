import { Client, Databases } from "appwrite";
import config from '../config/config'

class ProfileService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.databases = new Databases(this.client);
  }

  async createUserProfile({ $id, name, email, profileImg = "", Bio = ""}) {
    return await this.databases.createDocument(
      config.appwriteDatabaseId,
      config.appwriteProfileId,
      $id,
      {
        name,
        email,
        profileImg,
        Bio
      }
    )
  }

  async getUserProfile($id) {
    return await this.databases.getDocument(
      config.appwriteDatabaseId,
      config.appwriteProfileId,
      $id
    )
  }

  async updateProfile($id, data){
    return await this.databases.updateDocument(
      config.appwriteDatabaseId,
      config.appwriteProfileId,
      $id,
      data
    )
  }
}

const profileService = new ProfileService()
export default new ProfileService();