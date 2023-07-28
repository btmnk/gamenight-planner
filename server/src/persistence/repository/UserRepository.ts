import { DB } from "../DB.js";
import { Users } from "../schema/schema.js";

export const UserRepository = {
  async getUserByDiscordId(discordUserId: string) {
    return DB.query.Users.findFirst({ where: (Users, { eq }) => eq(Users.discordUserId, discordUserId) });
  },

  async createUser(discordUserId: string) {
    const [createdUser] = await DB.insert(Users).values({ discordUserId }).returning();
    return createdUser;
  },
};
