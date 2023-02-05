import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { serverEnv } from "@/configs/serverEnv";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: serverEnv.GOOGLE_CLIENT_ID,
      clientSecret: serverEnv.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
