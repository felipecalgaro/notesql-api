import { Name } from "../../../../entities/name";
import { User } from "../../../../entities/user";
import { IUsersRepository } from "../../../../repositories/users-repository";
import { authService } from "../auth";
import jwt from "jsonwebtoken";
import { uploadFile } from "../../../../s3";
import { generateAvatar } from "../../../../utils/generate-avatar";
import fs from "fs";

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

  const avatarChar = user.name[0].toUpperCase();
  const filename = `avatar_${Date.now()}`;

  generateAvatar(avatarChar, filename);

  const result = await uploadFile({
    filename: `${filename}.png`,
    path: `uploads/${filename}.png`,
  });

  user.setAvatarUrl(result.Location);

  fs.unlinkSync(`uploads/${filename}.png`);

  let createdUser;
  try {
    createdUser = await repository.createUser(user);
  } catch {
    throw new Error(
      "Error while creating a user. Check the credentials given."
    );
  }

  const token = jwt.sign(
    {
      userId: createdUser!.id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1y" }
  );

  return { token, user: createdUser };
}
