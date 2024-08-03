"use server";
import { hashUserPassword, verifyPassword } from "./hashpassword";
import {
  createAdminAuthSession,
  createUserAuthSession,
  github,
  google,
} from "./auth";
import { getUserByEmail, saveUser } from "./user";
import { redirect } from "next/navigation";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";

export async function Signup(prevState, formdata) {
  const username = formdata.get("username").trim();
  const email = formdata.get("email").trim();
  const password = formdata.get("password").trim();
  let errors = {};
  if (!username) {
    errors.username = "Username is required";
  }
  if (!email || !email.includes("@")) {
    errors.email = "Please enter a valid email address";
  }
  if (!password || password.trim().length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }
  if (Object.keys(errors).length) {
    return { errors };
  }
  const hashedPassword = hashUserPassword(password);
  try {
    const result = await saveUser({
      username,
      email,
      hashedPassword,
      role: "user",
    });
    await createUserAuthSession(result._id);
    redirect("/");
  } catch (error) {
    if (error.code === 11000) {
      return { errors: { email: "Email already in use." } };
    }
    throw error;
  }
}

export async function Login(prevState, formdata, mode) {
  const email = formdata.get("email");
  const password = formdata.get("password");
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { errors: { email: "This Email Does not Exist" } };
  }
  const isValidPassword = verifyPassword(
    existingUser.hashed_password,
    password,
  );
  if (!isValidPassword) {
    return { errors: { password: "Wrong Password" } };
  }
  const role = existingUser.role;
  if (mode === "admin" && role === "admin") {
    await createAdminAuthSession(existingUser._id);
  } else {
    return { errors: { email: "You are not an admin" } };
  }
  await createUserAuthSession(existingUser._id);
  redirect("/");
}

export async function GithubAuth() {
  try {
    const state = generateState();
    const url = await github.createAuthorizationURL(state);
    cookies().set("github_oauth_state", state, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 10,
      sameSite: "lax",
    });

    return redirect(url);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function GoogleAuth() {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["profile", "email"],
  });
  cookies().set("state", state, {
    secure: process.env.NODE_ENV === "production", // set to false in localhost
    path: "/",
    maxAge: 60 * 10, // 10 min
  });

  // store code verifier as cookie
  cookies().set("code_verifier", codeVerifier, {
    secure: process.env.NODE_ENV === "production", // set to false in localhost
    path: "/",
    maxAge: 60 * 10, // 10 min
  });

  redirect(url);
}
