import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

import { AppRouter } from "@/server/routers/app";

export const useTRPC = () => {
  return createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({ url: "/api/trpc" })],
  });
};
