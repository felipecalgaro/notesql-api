import { User } from "../../../entities/user";
import { IUsersRepository } from "../../../repositories/users-repository";

import { PrismaClient } from "@prisma/client";
import { prismaUserMapper } from "../mappers/prisma-user-mapper";
import { RawNote } from "./prisma-notes-repository";

export interface RawUser {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar_url?: string | null;
  created_at: Date;
  notes?: RawNote[];
}

export class PrismaUsersRepository implements IUsersRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: {
        notes: true,
      },
    });

    return users.map(prismaUserMapper.toDomain);
  }

  async authenticateUser(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        notes: true,
      },
    });

    if (!user) return null;

    return prismaUserMapper.toDomain(user);
  }

  async createUser(raw: User): Promise<User | null> {
    const user = await this.prisma.user.create({
      data: prismaUserMapper.toPrisma(raw),
      include: {
        notes: true,
      },
    });

    if (!user) return null;

    return prismaUserMapper.toDomain(user);
  }
}
