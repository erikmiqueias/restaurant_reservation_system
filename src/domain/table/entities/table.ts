import {
  TableCapacityNotAvailableError,
  TableNumberNotAvailableError,
} from "../../../app/tables/errors/table.error.js";

export type TableStatus = "ACTIVE" | "MAINTENANCE";

export interface TableProps {
  tableNumber: number;
  capacity: number;
  status: TableStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Table {
  private _id: string;
  private props: TableProps;

  private constructor(props: TableProps, id: string) {
    this._id = id;
    this.props = props;
  }

  static create(props: TableProps, id?: string): Table {
    if (props.capacity < 1 || props.capacity > 8)
      throw new TableCapacityNotAvailableError();

    return new Table(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id ?? crypto.randomUUID(),
    );
  }

  static restore(props: TableProps, id: string): Table {
    return new Table(props, id);
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }

  public changeCapacity(capacity: number): void {
    if (capacity < 1 || capacity > 8)
      throw new TableCapacityNotAvailableError();

    this.props.capacity = capacity;
    this.touch();
  }

  public changeStatus(status: TableStatus): void {
    this.props.status = status;
    this.touch();
  }

  public changeTableNumber(tableNumber: number): void {
    if (tableNumber < 1) throw new TableNumberNotAvailableError();
    this.props.tableNumber = tableNumber;
    this.touch();
  }

  get id(): string {
    return this._id;
  }

  get tableNumber(): number {
    return this.props.tableNumber;
  }

  get capacity(): number {
    return this.props.capacity;
  }

  get status(): TableStatus {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt!;
  }
  get updatedAt(): Date {
    return this.props.updatedAt!;
  }
}
