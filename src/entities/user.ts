import { Note } from "./note";

export interface UserProps {
  notes?: Note[];
  name: string;
  email: string;
  password: string;
  avatar_url?: string | null;
  created_at?: Date;
}

export class User {
  constructor(private props: UserProps, private _id?: number) {}

  get id() {
    return this._id;
  }

  get notes() {
    return this.props.notes;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get avatar_url() {
    return this.props.avatar_url;
  }

  public setAvatarUrl(url: string) {
    this.props.avatar_url = url;
  }

  get created_at() {
    return this.props.created_at;
  }
}
