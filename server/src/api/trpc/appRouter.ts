import { getToken } from "../procedures/auth/getToken.js";
import { getUserInfo } from "../procedures/auth/getUserInfo.js";
import { logout } from "../procedures/auth/logout.js";
import { getEvents } from "../procedures/event/getEvents.js";
import { router } from "./tRPC.js";

export const appRouter = router({
  auth: router({
    getUserInfo,
    getToken,
    logout,
  }),

  event: router({
    getEvents,
  }),
});
