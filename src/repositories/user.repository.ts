import { prisma } from "../database/prisma-client";
import { User, UserCreate, UserRepository } from "../interfaces/user.interface";

class UserRepositoryPrisma implements UserRepository {
  async createUser(data: UserCreate): Promise<User> {
    const result = await prisma.user.create({
      data: data,
    });
    return result;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const result = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return result || undefined;
  }
}

export { UserRepositoryPrisma };
