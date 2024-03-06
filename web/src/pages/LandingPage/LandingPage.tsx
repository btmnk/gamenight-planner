import { Button } from "@mantine/core";
import { PageLayout } from "../../layout/PageLayout/PageLayout";
import { useNavigate } from "@tanstack/react-router";

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <span>Hello world!</span>
      <Button onClick={() => navigate({ to: "/events" })}>Login</Button>
    </PageLayout>
  );
};
