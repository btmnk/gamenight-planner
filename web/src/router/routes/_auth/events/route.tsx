import { createFileRoute } from "@tanstack/react-router";
import { EventsPage } from "../../../../pages/EventsPage/EventsPage";

export const Route = createFileRoute("/_auth/events")({
  component: () => <EventsPage />,
});
