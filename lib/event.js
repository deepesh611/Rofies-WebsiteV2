import { Event } from "@/models/models";
import { dbConnect } from "./user";

export async function getAllEvents() {
  await dbConnect();
  let events;
  try {
    events = await Event.find({});
  } catch (err) {
    throw err;
  }
  return events;
}

export async function getEventbyID(id) {
  await dbConnect();

  let event;
  try {
    event = await Event.findById(id);
  } catch (err) {
    throw err;
  }
  return event;
}
