import { DB } from "../DB.js";
import { Events } from "../schema/Events.js";

export const EventRepository = {
  get() {
    return DB.select().from(Events);
  },
};
