import { FastifyReply, FastifyRequest } from "fastify";

type Role = "CUSTOMER" | "ADMIN";

export const verifyRole = (role: Role) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const userRole = request.user.role;
    if (userRole !== role) {
      return reply.status(403).send({
        code: "FORBIDDEN",
        message: "Only admins can access this resource.",
      });
    }
  };
};
