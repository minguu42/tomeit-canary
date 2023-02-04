import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

import type { AppRouter } from "@/server/routers/_app";

export const useTRPC = () => {
  return createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({ url: "/api/trpc" })],
  });
};
