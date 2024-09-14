import {
  ContactCreate,
  ContactRepository,
} from "../interfaces/contact.interface";
import { UserRepository } from "../interfaces/user.interface";
import { ContactsRepositoryPrisma } from "../repositories/contacts.repository";
import { UserRepositoryPrisma } from "../repositories/user.repository";

class ContactUseCase {
  private contactRepository: ContactRepository;
  private userRepository: UserRepository;
  constructor() {
    this.contactRepository = new ContactsRepositoryPrisma();
    this.userRepository = new UserRepositoryPrisma();
  }

  async createContact({ email, name, phone, userEmail }: ContactCreate) {
    const user = await this.userRepository.findByEmail(userEmail);

    if (!user) {
      throw new Error(`User with email: ${userEmail} not found`);
    }

    const verifyExistsContact = await this.contactRepository.findByEmailOrPhone(
      email,
      phone
    );

    if (verifyExistsContact) {
      throw new Error("Contact already exists");
    }

    const contact = await this.contactRepository.createContact({
      email,
      name,
      phone,
      userId: user.id,
    });

    return contact;
  }
}

export { ContactUseCase };
