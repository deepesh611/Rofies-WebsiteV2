import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user_name: { type: String },
  email_id: { type: String },
  hashed_password: { type: String },
  github_id: { type: String },
  google_id: { type: String },
  role: { type: String },
});
const sessionSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  expires_at: {
    type: Date,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const eventSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  start_date: { type: Date },
  end_date: { type: Date },
  image_link: { type: String },
  location: { type: String },
  registration_link: { type: String },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Session =
  mongoose.models.Session || mongoose.model("Session", sessionSchema);
export const Event =
  mongoose.models.Event || mongoose.model("Event", eventSchema);
