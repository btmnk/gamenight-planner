import { handleRequest } from "../../util/handleRequest.js";
import { User } from "../../domain/discord/User.js";
import { Config } from "../../Config.js";
import { TokenResponse } from "../../domain/discord/TokenResponse.js";

export const DiscordService = {
  async getUserInfo(accessToken: string) {
    return handleRequest<User>(() =>
      fetch(Config.DISCORD_USERS_ME, { headers: { authorization: `Bearer ${accessToken}` } }),
    );
  },

  async exchangeToken(code: string) {
    const accessTokenExchangeData = new URLSearchParams();
    accessTokenExchangeData.set("client_id", Config.DISCORD_CLIENT_ID);
    accessTokenExchangeData.set("client_secret", Config.DISCORD_CLIENT_SECRET);
    accessTokenExchangeData.set("grant_type", "authorization_code");
    accessTokenExchangeData.set("code", code);
    accessTokenExchangeData.set("redirect_uri", encodeURI(Config.DISCORD_AUTH_REDIRECT_URI));
    accessTokenExchangeData.set("scope", "identify");

    const accessTokenData = await handleRequest<TokenResponse>(() =>
      fetch(Config.DISCORD_TOKEN_URL, {
        method: "POST",
        body: accessTokenExchangeData.toString(),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }),
    );

    return accessTokenData;
  },
};
