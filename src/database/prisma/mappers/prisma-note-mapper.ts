import { Note, Status } from "../../../entities/note";
import { RawNote } from "../repositories/prisma-notes-repository";
import { prismaUserMapper } from "./prisma-user-mapper";

export const prismaNoteMapper = {
  toPrisma: (note: Note) => {
    return {
      body: note.body,
      title: note.title,
      created_at: note.created_at,
      deleted_at: note.deleted_at,
      priority: note.priority,
      status: note.status,
      id: note.id,
    };
  },
  toDomain: (raw: RawNote) => {
    return new Note(
      {
        author: prismaUserMapper.toDomain(raw.author),
        body: raw.body,
        created_at: raw.created_at,
        priority: raw.priority,
        status: raw.status as Status,
        title: raw.title,
        deleted_at: raw.deleted_at ?? undefined,
      },
      raw.id
    );
  },
};
