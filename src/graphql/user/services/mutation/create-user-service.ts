import { Name } from "../../../../entities/name";
import { User } from "../../../../entities/user";
import { IUsersRepository } from "../../../../repositories/users-repository";
import { authService } from "../auth";
import jwt from "jsonwebtoken";
import { execSync } from "child_process";
import { uploadFile } from "../../../../s3";

export interface CreateUserArgs {
  user: {
    email: string;
    password: string;
    name: string;
  };
}

export async function createUserService(
  args: CreateUserArgs,
  repository: IUsersRepository
) {
  const hashedPassword = await authService.hashPassword(args.user.password);

  const user = new User({
    email: args.user.email,
    name: new Name(args.user.name).value,
    password: hashedPassword,
  });

  const filename = `avatar_${Date.now()}`;

  execSync(
    `npm run generateAvatar -- ${user.name[0].toUpperCase()} ${filename}`
  );

  const result = await uploadFile({
    filename: `${filename}.png`,
    path: `uploads/${filename}.png`,
  });

  user.setAvatarUrl(result.Location);

  const createdUser = await repository.createUser(user);

  if (!createdUser) throw new Error("Error while creating a user.");

  const token = jwt.sign(
    {
      userId: createdUser.id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1y" }
  );

  return { token, user: createdUser };
}
