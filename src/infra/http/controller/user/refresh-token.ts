import { FastifyReply, FastifyRequest } from "fastify";
import { GenericAuthError } from "../../../../app/user/errors/user.error.js";

export class RefreshTokenController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const cookie = request.cookies.refreshToken;

    if (!cookie) throw new GenericAuthError();

    const unsignedCookie = request.unsignCookie(cookie);

    if (!unsignedCookie.valid || !unsignedCookie.value)
      throw new GenericAuthError();

    try {
      const decoded = request.server.jwt.verify<{ sub: string; role: string }>(
        unsignedCookie.value,
      );

      if (!decoded.sub || !decoded.role) throw new GenericAuthError();

      const newAccessToken = await reply.jwtSign(
        {
          sub: decoded.sub,
          role: decoded.role,
        },
        {
          expiresIn: "15m",
        },
      );

      const newRefreshToken = await reply.jwtSign(
        {
          sub: decoded.sub,
          role: decoded.role,
        },
        {
          expiresIn: "7d",
        },
      );

      reply.setCookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        signed: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

      return reply.status(200).send({
        accessToken: newAccessToken,
      });
    } catch (_) {
      reply.clearCookie("refreshToken", { path: "/" });
      throw new GenericAuthError();
    }
  }
}
