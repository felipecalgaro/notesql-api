import { User } from "../../../entities/user";
import { IUsersRepository } from "../../../repositories/users-repository";

import { PrismaClient } from "@prisma/client";
import { prismaUserMapper } from "../mappers/prisma-user-mapper";
import { AuthenticateArgs } from "../../../graphql/user/services/query/authenticate-service";

export interface RawUser {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar_url?: string | null;
  created_at: Date;
}

export class PrismaUsersRepository implements IUsersRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users.map(prismaUserMapper.toDomain);
  }

  async authenticateUser(data: AuthenticateArgs): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: data.email,
        password: data.password,
      },
    });

    if (!user) return null;

    return prismaUserMapper.toDomain(user);
  }

  async createUser(raw: User): Promise<User | null> {
    const user = await this.prisma.user.create({
      data: prismaUserMapper.toPrisma(raw),
    });

    if (!user) return null;

    return prismaUserMapper.toDomain(user);
  }
}
