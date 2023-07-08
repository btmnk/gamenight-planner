import { z } from "zod";

const envSchema = z.object({
  DEVELOPMENT: z
    .string()
    .transform((arg) => JSON.parse(arg))
    .pipe(z.boolean()),

  CLIENT_SECRET: z.string().nonempty(),

  DISCORD_CLIENT_ID: z.string().nonempty(),
  DISCORD_CLIENT_SECRET: z.string().nonempty(),
  DISCORD_TOKEN_URL: z.string().nonempty(),
  DISCORD_AUTH_REDIRECT_URI: z.string().nonempty(),
  DISCORD_API_BASE_URL: z.string().nonempty(),
  DISCORD_USERS_ME: z.string().nonempty(),

  FRONTEND_BASE_URL: z.string().nonempty(),
});

export const Config = envSchema.parse(process.env);
