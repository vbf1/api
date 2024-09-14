import { User, UserCreate, UserRepository } from "../interfaces/user.interface";
import { UserRepositoryPrisma } from "../repositories/user.repository";

class UserUseCase {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepositoryPrisma();
  }

  async create(userCreate: UserCreate): Promise<User> {
    const verifyUserExists = await this.userRepository.findByEmail(
      userCreate.email
    );
    if (verifyUserExists) {
      throw new Error(`User with email ${userCreate.email} already exists`);
    }
    const result = await this.userRepository.createUser(userCreate);
    return result;
  }
}

export { UserUseCase };
