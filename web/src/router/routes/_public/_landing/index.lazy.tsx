import { createLazyFileRoute } from "@tanstack/react-router";
import { LandingPage } from "../../../../pages/LandingPage/LandingPage";

export const Route = createLazyFileRoute("/_public/_landing/")({
  component: () => <LandingPage />,
});
