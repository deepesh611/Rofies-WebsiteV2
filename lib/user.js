import { Session, User } from "@/models/models";
import mongoose from "mongoose";

export async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  const result = await mongoose.connect(process.env.MONGODB_URI);
  if (result) {
    console.log("Connected to MongoDB");
  }
}

export async function saveUser({
  googleId,
  githubId,
  username,
  email,
  hashedPassword,
  role,
}) {
  try {
    await dbConnect();
    const user = new User({
      user_name: username,
      email_id: email,
      hashed_password: hashedPassword,
      github_id: githubId,
      google_id: googleId,
      role: role,
    });
    const result = await user.save();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getUserByEmail(email) {
  await dbConnect();
  const existingUser = await User.findOne({ email_id: email });
  return existingUser;
}

export async function getUserbyGithubId(githubId) {
  await dbConnect();
  const existingUser = await User.findOne({ github_id: githubId });
  return existingUser;
}

export async function getUserbyGoogleId(googleId) {
  await dbConnect();
  const existingUser = await User.findOne({ google_id: googleId });
  return existingUser;
}

export async function deleteSessionbyId(sessionId) {
  await dbConnect();
  const result = await Session.deleteOne({ _id: sessionId });
  return result;
}
