export class Organisation {
  constructor(
    public _id: string,
    public id: string,
    public name: string,
    public address: string,
    public city: string,
    public phone: string,
    public type: string,
    public status: boolean
  ) {}
}
