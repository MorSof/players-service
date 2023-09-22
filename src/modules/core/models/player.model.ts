export class Player {
  id?: number;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: Partial<Player>) {
    Object.assign(this, data);
  }
}
