import { PrismaClient } from "@prisma/client";
import { Note, Status } from "../../../entities/note";
import { INotesRepository } from "../../../repositories/notes-repository";
import { prismaNoteMapper } from "../mappers/prisma-note-mapper";
import { RawUser } from "./prisma-users-repository";

export interface RawNote {
  id: number;
  author: RawUser;
  title: string;
  body: string;
  status: string;
  priority: boolean;
  deleted_at?: Date | null;
  created_at: Date;
}

export type IncludedRawNote = Omit<RawNote, "author">;

export class PrismaNotesRepository implements INotesRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getNotesByAuthor(authorId: number): Promise<Note[]> {
    const notes = await this.prisma.note.findMany({
      where: {
        author_id: authorId,
        deleted_at: null,
      },
      include: {
        author: true,
      },
    });

    return notes.map(prismaNoteMapper.toDomain);
  }

  async writeNote(data: Note, authorId: number): Promise<Note | null> {
    const raw = await this.prisma.note.create({
      data: {
        ...prismaNoteMapper.toPrisma(data),
        author_id: authorId,
      },
      include: {
        author: true,
      },
    });

    return prismaNoteMapper.toDomain(raw);
  }

  async prioritizeNote(
    noteId: number,
    priority: boolean
  ): Promise<Note | null> {
    const note = await this.prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        priority,
      },
      include: {
        author: true,
      },
    });

    if (!note) return null;

    return prismaNoteMapper.toDomain(note);
  }

  async updateStatus(noteId: number, status: Status): Promise<Note | null> {
    const note = await this.prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        status,
      },
      include: {
        author: true,
      },
    });

    if (!note) return null;

    return prismaNoteMapper.toDomain(note);
  }

  async deleteNote(noteId: number): Promise<boolean> {
    const note = await this.prisma.note.update({
      data: {
        deleted_at: new Date(),
      },
      where: {
        id: noteId,
      },
      include: {
        author: true,
      },
    });

    if (!note) return false;

    return prismaNoteMapper.toDomain(note).delete();
  }
}
