import { DB } from "../DB.js";

export const EventRepository = {
  getUserEvents(userId: string) {
    return DB.query.Events.findMany({ where: (Users, { eq }) => eq(Users.id, userId) });
  },
};
