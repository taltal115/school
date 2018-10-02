// import {CustomStatus} from '../shared/enums/CustomStatus';

export class Ticket {
  public _id: string;
  public date?: Date;
  public teacherName: string;
  public teacherId: string;
  public damagedDevice: string;
  public serialNumber: string;
  public structure: string;
  public deviceLocation: string;
  public problemsNature: string;
  public missingEquipments: string;
  public teachersContactPhone: string;
  public status: string;

  constructor(
    _id: string,
    date: Date,
    teacherName: string,
    damagedDevice: string,
    serialNumber: string,
    structure: string,
    deviceLocation: string,
    problemsNature: string,
    missingEquipments: string,
    teachersContactPhone: string,
    status: string,
    teacherId?: string,
  ) {
    this._id = _id;
    this.date = new Date();
    this.teacherName = teacherName;
    this.teacherId = teacherId;
    this.damagedDevice = damagedDevice;
    this.serialNumber = serialNumber;
    this.structure = structure;
    this.deviceLocation = deviceLocation;
    this.problemsNature = problemsNature;
    this.missingEquipments = missingEquipments;
    this.teachersContactPhone = teachersContactPhone;
    this.status = status
  }
}
