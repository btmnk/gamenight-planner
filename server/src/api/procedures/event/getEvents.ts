import { authProcedure } from "../../trpc/tRPC.js";
import { EventRepository } from "../../../persistence/repository/EventRepository.js";

export const getEvents = authProcedure.query(async ({ ctx }) => {
  return EventRepository.getUserEvents(ctx.user?.id);
});
