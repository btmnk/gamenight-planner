import { DB } from "../DB.js";
import { Users } from "../schema/schema.js";

export interface UserRepositoryCreateUser {
  discordUserId: string;
  username: string;
  avatar: string | null;
}

export const UserRepository = {
  async getUserByDiscordId(discordUserId: string) {
    return DB.query.Users.findFirst({
      where: (Users, { eq }) => eq(Users.discordUserId, discordUserId),
    });
  },

  async getUser(userId: string) {
    return DB.query.Users.findFirst({ where: (Users, { eq }) => eq(Users.id, userId) });
  },

  async createUser(props: UserRepositoryCreateUser) {
    const [createdUser] = await DB.insert(Users)
      .values({
        discordUserId: props.discordUserId,
        username: props.username,
        avatar: props.avatar,
      })
      .returning();
    return createdUser;
  },
};
