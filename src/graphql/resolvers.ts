import { PrismaClient } from "@prisma/client";

import { PrismaUsersRepository } from "../database/prisma/repositories/prisma-users-repository";
import { PrismaNotesRepository } from "../database/prisma/repositories/prisma-notes-repository";

import { getUserResolver } from "./user/resolver";
import { getNoteResolver } from "./note/resolver";

import { mergeResolvers } from "@graphql-tools/merge";

const prisma = new PrismaClient();

const prismaUserRepository = new PrismaUsersRepository(prisma);
const prismaNoteRepository = new PrismaNotesRepository(prisma);

const userResolver = getUserResolver(prismaUserRepository);
const noteResolver = getNoteResolver(prismaNoteRepository);

const resolversArray = [userResolver, noteResolver];

const resolvers = mergeResolvers(resolversArray);

export default resolvers;
