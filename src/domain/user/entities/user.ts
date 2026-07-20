import crypto from "crypto";

export type Role = "CUSTOMER" | "ADMIN";

export interface UserProps {
  username: string;
  email: string;
  password: string;
  role: Role;
  createdAt?: Date;
}

export class User {
  private _id: string;
  private props: UserProps;

  private constructor(props: UserProps, id: string) {
    this._id = id;
    this.props = props;
  }

  static create(
    props: Omit<UserProps, "createdAt"> & {
      createdAt?: Date;
    },
    id?: string,
  ): User {
    return new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id ?? crypto.randomUUID(),
    );
  }

  static restore(
    props: Omit<UserProps, "createdAt"> & { createdAt?: Date },
    id: string,
  ): User {
    return new User(props, id);
  }

  get id(): string {
    return this._id;
  }

  get username(): string {
    return this.props.username;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get role(): Role {
    return this.props.role;
  }

  get createdAt(): Date {
    return this.props.createdAt!;
  }
}
