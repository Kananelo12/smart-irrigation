import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
  platform: "com.innovation.agrisync",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform);

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
  try {
    const redirectUri = Linking.createURL("/");

    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );

    if (!response) throw new Error("failed to login");

    const broweserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );

    if (broweserResult.type !== "success") throw new Error("Failed to login");

    const url = new URL(broweserResult.url);

    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId) throw new Error("Failed to login");

    const session = await account.createSession(userId, secret);

    if (!session) throw new Error("Failed to create a sessoin");

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function logout() {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    // Check if an active session exists
    const totalActiveSessions = await account.listSessions();
    // If no active session exists, return null (no logged-in user)
    if (totalActiveSessions.total === 0) {
      return null;
    }
    // Otherwise, fetch the current user details
    const response = await account.get();

    if (response.$id) {
      // const userAvatar = avatar.getImage()
      const userAvatar = avatar.getInitials(response.name);
      return {
        ...response,
        avatar: userAvatar.toString(),
      };
    }
  } catch (error: any) {
    // TODO: instead of suppression, send them to an error monitoring service
    // TODO: or log them to a file
    // Suppress errors related to missing scope for guest users
    if (error.message && error.message.includes("missing scope (account)")) {
      return null;
    }
    console.error(error);
    return null;
  }
}
