import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";

import type { AppRouter } from "@/server/routers/_app";

export const useTRPC = () => {
  return createTRPCProxyClient<AppRouter>({
    transformer: superjson,
    links: [httpBatchLink({ url: "/api/trpc" })],
  });
};
