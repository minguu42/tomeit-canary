import { z } from "zod";

import { procedure, router } from "@/server/trpc";

export const taskRouter = router({
  hello: procedure.input(z.object({ text: z.string() })).query(({ input }) => {
    return {
      greeting: `hello ${input.text}`,
    };
  }),
});
