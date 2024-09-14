import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
import { UserCreate } from "../interfaces/user.interface";
import { ContactCreate } from "../interfaces/contact.interface";
import { ContactUseCase } from "../usecases/contact.usecase";
import { authMiddleware } from "../middlewares/auth.middleware";

export async function contactRoutes(fastify: FastifyInstance) {
  const contactUseCase = new ContactUseCase();
  fastify.addHook("preHandler", authMiddleware);
  fastify.post<{ Body: ContactCreate }>("/", async (req, reply) => {
    const { email, name, phone } = req.body;
    const emailUser = req.headers["email"];
    try {
      const data = await contactUseCase.createContact({
        email,
        name,
        phone,
        userEmail: emailUser,
      });
      return reply.status(201).send(data);
    } catch (error) {
      reply.send(error);
    }
  });
}
