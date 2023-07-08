import React from "react";
import { trpc } from "../../trpc/trpc";

const DashboardPage: React.FC = () => {
  const meQuery = trpc.auth.getUserInfo.useQuery();

  return (
    <div>
      <span>Good Day {meQuery.data?.username}</span>
    </div>
  );
};

export { DashboardPage };
