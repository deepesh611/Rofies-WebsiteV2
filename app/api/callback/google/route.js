import { createUserAuthSession, google } from "@/lib/auth";
import { getUserbyGoogleId, saveUser } from "@/lib/user";
import { OAuth2RequestError } from "arctic";
import { cookies } from "next/headers";

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("state")?.value ?? null;
  const storedCodeVerifier = cookies().get("code_verifier")?.value ?? null;
  if (
    code === null ||
    storedState === null ||
    state !== storedState ||
    storedCodeVerifier === null
  ) {
    return new Response("Data Error", {
      status: 400,
    });
  }
  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      storedCodeVerifier,
    );
    const accessToken = tokens.accessToken;
    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const user = await response.json();
    const existingUser = await getUserbyGoogleId(user.sub);
    if (existingUser) {
      await createUserAuthSession(existingUser._id);
      return new Response("Existing User", {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    } else {
      const result = await saveUser({
        username: user.name,
        email: user.email,
        googleId: user.sub,
        hashedPassword: null,
        githubId: null,
        role: "user",
      });
      await createUserAuthSession(result._id);
      return new Response("New user", {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      const code = e.code;
      const description = e.description;
      return new Response(`problem occered ${description}`, {
        status: code,
      });
    }
    return new Response(`othercause are ${e}`, {
      status: 500,
    });
  }
}
