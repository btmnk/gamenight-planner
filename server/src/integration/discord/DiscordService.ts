import axios from "axios";

import { handleRequest } from "../../util/handleRequest.js";
import { User } from "../../domain/discord/User.js";
import { Config } from "../../Config.js";

export const DiscordService = {
  async getUserInfo(accessToken: string) {
    return handleRequest(() =>
      axios.get<User>(Config.DISCORD_USERS_ME, {
        headers: { authorization: `Bearer ${accessToken}` },
      }),
    );
  },
};
