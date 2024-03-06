import { z } from "zod";

const envSchema = z.object({
  DEVELOPMENT: z
    .string()
    .transform((arg) => arg === "true")
    .pipe(z.boolean()),

  PORT: z.coerce.number().positive().default(8080).catch(8080),

  CLIENT_SECRET: z.string().min(1),

  DB_URL: z.string().min(1),

  DISCORD_CLIENT_ID: z.string().min(1),
  DISCORD_CLIENT_SECRET: z.string().min(1),
  DISCORD_AUTH_REDIRECT_URI: z.string().min(1),
  DISCORD_API_BASE_URL: z.string().min(1).default("https://discord.com/api"),
  DISCORD_TOKEN_URL: z.string().min(1).default("https://discord.com/api/oauth2/token"),
  DISCORD_USERS_ME: z.string().min(1).default("https://discord.com/api/users/@me"),

  FRONTEND_BASE_URL: z.string().min(1).default("http://localhost:3000"),
});

// When trpc imports the appRouter type the frontend tsconfig also typechecks this Config.ts file.
// Since we're using bun here we need to use process.env instead of import.meta.env but the frontend thinks that's an error.
// Since we don't need the Config types in the frontend we can ignore typechecks here.
// ATTENTION: This is not recommended. If possible another solution is preferable.
// @ts-ignore
export const Config = envSchema.parse(process.env);
