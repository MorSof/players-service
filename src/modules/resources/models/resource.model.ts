export class Resource {
  id: number;
  type: string;
  name: string;
  amount?: number;
  resources: any;
  extraArgs?: any;

  constructor(partial: Partial<Resource>) {
    Object.assign(this, partial);
  }
}
