import { createUserAuthSession, github } from "@/lib/auth";
import { getUserbyGithubId, saveUser } from "@/lib/user";
import { OAuth2RequestError } from "arctic";
import { cookies } from "next/headers";

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  let redirection = false;
  const storedState = cookies().get("github_oauth_state")?.value ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const githubUser = await githubUserResponse.json();
    const existingUser = await getUserbyGithubId(githubUser.id);
    if (existingUser) {
      await createUserAuthSession(existingUser._id);
      redirection = true;
    } else {
      const result = await saveUser({
        username: githubUser.login,
        email: githubUser.email,
        githubId: githubUser.id,
        hashedPassword: null,
        role: "user",
      });
      await createUserAuthSession(result._id);
      redirection = true;
    }
  } catch (e) {
    if (
      e instanceof OAuth2RequestError &&
      e.message === "bad_verification_code"
    ) {
      return new Response("bad verification code", {
        status: 400,
      });
    }
    return new Response(null, {
      status: 400,
    });
  } finally {
    if (redirection) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }
  }
}
