import { Lucia, TimeSpan } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { GitHub, Google } from "arctic";
import { cache } from "react";
import { deleteSessionbyId } from "./user";

export const adapter = new MongodbAdapter(
  mongoose.connection.collection("sessions"),
  mongoose.connection.collection("users"),
);
export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getSessionAttributes: (attributes) => {
    return {
      role: attributes.role,
    };
  },
  sessionExpiresIn: new TimeSpan(1, "h"),
});

export const github = new GitHub(
  process.env.GITHUB_CLIENT_ID,
  process.env.GITHUB_CLIENT_SECRET,
);

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.NEXT_PUBLIC_REDIRECT_URI,
);

export async function createAuthSession(userId) {
  const session = await lucia.createSession(userId, {
    role: "user",
  });
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
}

export const verifyAuthSession = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);
  // next.js throws when you attempt to set cookie when rendering page
  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch (e) {
    throw e;
  }
  return result;
});

export async function destroyAuthSession() {
  try {
    const session = await verifyAuthSession();
    if (!session) {
      return {
        error: "User not logged in.",
      };
    }
    await deleteSessionbyId(session.session.id);
    await lucia.invalidateUserSessions(session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return {
      success: true,
    };
  } catch (e) {
    throw e;
  }
}

export function verifyAuth() {
  const authCookie = cookies().get("auth_session");
  return authCookie ? true : false;
}

export async function getUserRoleFromSession() {
  try {
    const session = await verifyAuthSession();
    if (!session) {
      return {
        user: null,
        session: null,
      };
    }
    return session.session.role;
  } catch (e) {
    console.log(e);
    return null;
  }
}
