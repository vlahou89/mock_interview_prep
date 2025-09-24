"use server";

// ----------------------
// Server-side imports
// ----------------------
import { auth, db } from "../../firebase/admin"; // Firebase Admin SDK for auth and Firestore
import { cookies } from "next/headers"; // Next.js server-side cookies API

// ----------------------
// Constants
// ----------------------
const SESSION_DURATION = 60 * 60 * 24 * 7; // 1 week in seconds

// ----------------------
// Set session cookie
// ----------------------
export async function setSessionCookie(idToken: string) {
  // Get server-side cookie store
  const cookieStore = await cookies();

  // Create a secure, long-lived session cookie from Firebase ID token
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_DURATION * 1000, // Convert seconds to milliseconds
  });

  // Store session cookie in browser
  cookieStore.set("session", sessionCookie, {
    maxAge: SESSION_DURATION,
    httpOnly: true, // cannot be accessed via client-side JS
    secure: process.env.NODE_ENV === "production", // only HTTPS in production
    path: "/", // accessible site-wide
    sameSite: "lax", // basic CSRF protection
  });
}

// ----------------------
// Sign up a new user
// ----------------------
export async function signUp(params: SignUpParams) {
  console.log({
    project: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKeyLength: process.env.FIREBASE_PRIVATE_KEY?.length,
  });

  const { uid, name, email } = params;

  try {
    // Check if user already exists in Firestore
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists)
      return {
        success: false,
        message: "User already exists. Please sign in.",
      };

    // Save new user to Firestore
    await db.collection("users").doc(uid).set({
      name,
      email,
      // profileURL, resumeURL can be added here later
    });

    return {
      success: true,
      message: "Account created successfully. Please sign in.",
    };
  } catch (error: any) {
    console.error("Error creating user:", error);

    // Handle Firebase-specific errors
    if (error.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "This email is already in use",
      };
    }

    return {
      success: false,
      message: "Failed to create account. Please try again.",
    };
  }
}

// ----------------------
// Sign in an existing user
// ----------------------
export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    // Get user from Firebase by email
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord)
      return {
        success: false,
        message: "User does not exist. Create an account.",
      };

    // Create session cookie to keep user logged in
    await setSessionCookie(idToken);
  } catch (error: any) {
    console.log("");

    return {
      success: false,
      message: "Failed to log into account. Please try again.",
    };
  }
}

// ----------------------
// Sign out user
// ----------------------
export async function signOut() {
  // Delete session cookie from browser
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

// ----------------------
// Get currently logged-in user
// ----------------------
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  // Read session cookie
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  try {
    // Verify cookie and decode Firebase claims
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    // Fetch user info from Firestore
    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();
    if (!userRecord.exists) return null;

    // Return user data
    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.log(error);

    // If cookie is invalid or expired
    return null;
  }
}

// ----------------------
// Check if user is authenticated
// ----------------------
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user; // Returns true if user exists, false otherwise
}
