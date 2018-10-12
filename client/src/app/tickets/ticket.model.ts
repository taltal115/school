export class Ticket {
  constructor(
    public date: Date,
    public teacherName: string,
    public damagedDevice: string,
    public serialNumber: string,
    public structure: string,
    public deviceLocation: string,
    public problemsNature: string,
    public missingEquipments: string,
    public teachersContactPhone: string,
    public status: string,
    public teacherId?: string,
    public ticketCharge?: string,
    public ticketData?: string,
  ) {}
}
