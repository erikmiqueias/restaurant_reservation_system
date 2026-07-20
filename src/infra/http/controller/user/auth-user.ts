import { FastifyReply, FastifyRequest } from "fastify";
import {
  authUserBodySchema,
  authUserResponseSchema,
} from "../../schemas/user/user.schema.js";
import z from "zod";
import { makeAuthUser } from "../../../../main/factories/user/make-auth-user.js";

type AuthUserBodySchema = z.infer<typeof authUserBodySchema>;
type AuthUserResponseSchema = z.infer<typeof authUserResponseSchema>;

export class AuthUserController {
  async handle(
    request: FastifyRequest<{ Body: AuthUserBodySchema }>,
    reply: FastifyReply<{
      Reply: AuthUserResponseSchema;
    }>,
  ) {
    const body = request.body;

    const authUserUseCase = makeAuthUser();

    const isUserCredentialsValid = await authUserUseCase.execute(body);

    const accessToken = await reply.jwtSign(
      {
        sub: isUserCredentialsValid.id,
        role: isUserCredentialsValid.role,
      },
      {
        expiresIn: "15m",
      },
    );

    const refreshToken = await reply.jwtSign(
      {
        sub: isUserCredentialsValid.id,
        role: isUserCredentialsValid.role,
      },
      {
        expiresIn: "7d",
      },
    );

    reply.setCookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      secure: false,
      signed: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return reply.status(200).send({
      id: isUserCredentialsValid.id,
      username: isUserCredentialsValid.username,
      email: isUserCredentialsValid.email,
      role: isUserCredentialsValid.role,
      accessToken,
    });
  }
}
