import { User } from "./user";

export interface NoteProps {
  author?: User;
  title: string;
  body: string;
  priority: boolean;
  status: Status;
  deleted_at?: Date;
  created_at?: Date;
}

export enum Status {
  FINISHED = "FINISHED",
  UNFINISHED = "UNFINISHED",
}

export class Note {
  constructor(private props: NoteProps, private _id?: number) {}

  get id() {
    return this._id;
  }

  get author() {
    return this.props.author;
  }

  get body() {
    return this.props.body;
  }

  get title() {
    return this.props.title;
  }

  get priority() {
    return this.props.priority;
  }

  set priority(priority: boolean) {
    this.props.priority = priority;
  }

  get status() {
    return this.props.status;
  }

  set status(status: Status) {
    this.props.status = status;
  }

  get deleted_at() {
    return this.props.deleted_at;
  }

  delete() {
    this.props.deleted_at = new Date();

    return true;
  }

  get created_at() {
    return this.props.created_at;
  }
}
