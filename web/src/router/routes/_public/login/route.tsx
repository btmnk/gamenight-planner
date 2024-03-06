import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const RootSearchSchema = z.object({
  code: z.string().optional().catch(undefined),
});

export const Route = createFileRoute("/_public/login")({
  component: () => <div>Hello /_public/login!</div>,
  validateSearch: (search) => RootSearchSchema.parse(search),
});
