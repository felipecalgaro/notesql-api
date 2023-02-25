export interface UserProps {
  name: string;
  email: string;
  password: string;
  avatar_url?: string;
  created_at: Date;
}

export class User {
  constructor(private props: UserProps, private _id?: number) {}

  get id() {
    return this._id;
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

  get avatar_url(): string | undefined {
    return this.props.avatar_url;
  }

  public setAvatarUrl(url: string) {
    this.props.avatar_url = url;
  }

  get created_at() {
    return this.props.created_at;
  }
}
