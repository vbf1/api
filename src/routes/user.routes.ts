import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
import { UserCreate } from "../interfaces/user.interface";

export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase();
  fastify.post<{ Body: UserCreate }>("/", async (req, reply) => {
    const { email, name } = req.body;
    try {
      const data = await userUseCase.createUser({
        email,
        name,
      });
      return reply.status(201).send(data);
    } catch (error) {
      reply.send(error);
    }
  });
  fastify.get("/", (req, reply) => {
    reply.send({ hello: "world" });
  });
}
