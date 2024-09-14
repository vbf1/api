export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreate {
  email: string;
  name: string;
}

export interface UserRepository {
  createUser(data: UserCreate): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}
