import { Name } from "../../../entities/name";
import { User } from "../../../entities/user";
import { RawUser } from "../repositories/prisma-users-repository";

export const prismaUserMapper = {
  toPrisma: (user: User) => {
    return {
      email: user.email,
      name: user.name,
      password: user.password,
      avatar_url: user.avatar_url,
      created_at: user.created_at,
      id: user.id,
    };
  },
  toDomain: (raw: RawUser) => {
    return new User(
      {
        created_at: raw.created_at,
        email: raw.email,
        name: new Name(raw.name).value,
        password: raw.password,
        avatar_url: raw.avatar_url,
      },
      raw.id
    );
  },
};
