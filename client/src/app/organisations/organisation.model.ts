// import {CustomStatus} from '../shared/enums/CustomStatus';

export class Organisation {
  public name: string;
  public address: string;
  public city: string;
  public phone: string;
  public type: string;
  public status: boolean;

  constructor(
    name: string,
    address: string,
    city: string,
    phone: string,
    type: string,
    status: boolean
  ) {
    this.name = name;
    this.address = address;
    this.city = city;
    this.phone = phone;
    this.type = type;
    this.status = status;
  }
}
