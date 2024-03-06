export type JWTSessionPayload = {
  userId: string;
  discordUserId: string;
  username: string;
  accessToken: string;
  isAdmin: boolean;
};
