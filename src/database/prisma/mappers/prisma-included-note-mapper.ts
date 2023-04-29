import { Note, Status } from "../../../entities/note";
import { IncludedRawNote } from "../repositories/prisma-notes-repository";

export const prismaIncludedNoteMapper = {
  toDomain: (raw: IncludedRawNote) => {
    return new Note(
      {
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
