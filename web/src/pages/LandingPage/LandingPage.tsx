import { Button } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/auth/useAuth";

const LandingPage: React.FC = () => {
  const { signinRedirect, isAuthenticated } = useAuth();

  return (
    <div>
      {!isAuthenticated && <Button onClick={signinRedirect}>Login with Discord</Button>}
      <Button component={Link} to={"/app"}>
        App
      </Button>
    </div>
  );
};

export { LandingPage };
