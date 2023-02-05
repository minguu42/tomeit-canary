// @ts-check
const { z } = require("zod");

const serverSchema = z.object({
  NEXTAUTH_SECRET: z.string().min(1),
  NEXTAUTH_URL: z.string().url(),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
});

const _serverEnv = serverSchema.safeParse(process.env);

if (!_serverEnv.success) {
  console.error(
    "invalid server environment variables:",
    JSON.stringify(_serverEnv.error.format(), null, 4),
  );
  process.exit(1);
}

module.exports.serverEnv = { ..._serverEnv.data };
