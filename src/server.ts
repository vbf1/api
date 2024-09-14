import fastify, { FastifyInstance } from "fastify";
import { userRoutes } from "./routes/user.routes";
import { contactRoutes } from "./routes/contact.routes";

const app: FastifyInstance = fastify();

app.register(userRoutes, { prefix: "/users" });
app.register(contactRoutes, { prefix: "/contact" });

app.listen({ port: 3000 }, () =>
  console.log("Server is running in Port: 3000")
);
