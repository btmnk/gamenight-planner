import { authProcedure } from "../../trpc/tRPC.js";
import { EventRepository } from "../../../persistence/repository/EventRepository.js";

export const getEvents = authProcedure.query(async () => {
  return EventRepository.get();
});
