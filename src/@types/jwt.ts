declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      sub: string;
      role: "CUSTOMER" | "ADMIN";
    };
  }
}
