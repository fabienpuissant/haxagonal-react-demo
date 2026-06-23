import axios from 'axios';
import type { User } from '../../domain/User';
import type { UserRepository } from '../../domain/UserRepository';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

interface UserDto {
  id: number;
  name: string;
  username: string;
  email: string;
  company: { name: string };
  address: { city: string };
}

function toDomain(dto: UserDto): User {
  return {
    id: String(dto.id),
    name: dto.name,
    username: dto.username,
    email: dto.email,
    company: dto.company.name,
    city: dto.address.city,
  };
}

export class HttpUserRepository implements UserRepository {
  async findAll(): Promise<User[]> {
    const dtos = await axios.get<UserDto[]>(`${BASE_URL}/users`);
    return dtos.data.map(toDomain);
  }
}
