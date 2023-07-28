import React from "react";

import { trpc } from "../../trpc/trpc";
import { Layout } from "../../components/Layout/Layout";

const DashboardPage: React.FC = () => {
  const meQuery = trpc.auth.getUserInfo.useQuery();
  const eventsQuery = trpc.event.getEvents.useQuery();

  console.log(eventsQuery.data);

  return (
    <Layout>
      <span>Good Day {meQuery.data?.global_name}</span>
      <pre>{JSON.stringify(meQuery.data, undefined, 4)}</pre>
    </Layout>
  );
};

export { DashboardPage };
