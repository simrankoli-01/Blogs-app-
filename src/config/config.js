const getEnv = (key) => {
  const value = import.meta.env[key]
  if (!value || value === "undefined") {
    throw new Error(
      `Missing environment variable ${key}. Add it to .env and restart Vite.`
    )
  }
  return String(value).trim()
}

const config = {
  appwriteUrl: getEnv("VITE_APPWRITE_URL"),
  appwriteProjectId: getEnv("VITE_APPWRITE_PROJECT_ID"),
  projectId: getEnv("VITE_APPWRITE_PROJECT_ID"),
  appwriteDatabaseId: getEnv("VITE_APPWRITE_DATABASE_ID"),
  appwriteCollectionId: getEnv("VITE_APPWRITE_COLLECTION_ID"),
  appwriteBucketId: getEnv("VITE_APPWRITE_BUCKET_ID"),
  appwriteProfileId: getEnv("VITE_APPWRITE_PROFILECOLLECTION_ID")
}

export default config