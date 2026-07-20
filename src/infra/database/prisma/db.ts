import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "../../../main/env.js";
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}
const prisma =
  global.prisma ||
  new PrismaClient({
    adapter: new PrismaPg(env.DATABASE_URL),
  });

const client = prisma;

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default client;
