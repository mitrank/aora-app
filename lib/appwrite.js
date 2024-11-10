import { Client, Account, ID, Avatars, Databases } from "react-native-appwrite";

const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.ms-react-native.jsm-aora",
  projectId: "6730d4cb002c63d5b0b6",
  databaseId: "6730d6bf00242546eb31",
  userCollectionId: "6730d6d40008d6787d44",
  videoCollectionId: "6730d6fa0035907c345f",
  storageId: "6730d83a0006fafac465",
};

const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const performSignIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials();

    await performSignIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
