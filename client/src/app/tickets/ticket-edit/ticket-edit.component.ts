import {Component, OnDestroy, OnInit} from '@angular/core';
import * as TicketActions from "../store/ticket.actions";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromTicket from "../store/ticket.reducers";
import {Ticket} from "../ticket.model";
import {TicketsService} from "../tickets.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CurrentUserService} from "../../shared/current-user.service";
import {User} from "../../models/user";
import {validate} from "codelyzer/walkerFactory/walkerFn";
import {AppConstants} from "../../app.constants";

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css']
})
export class TicketEditComponent implements OnInit, OnDestroy {
  public subscription;
  public id: string;
  public paramsSubscription: any;
  public ticket: any;
  public editTicketForm: FormGroup;
  public editMode: boolean = false;

  public teacherName:string;
  public teacherId:string;
  public teachersContactPhone:string;
  public problemsNature:string;
  public missingEquipments:string;
  public deviceLocation:string;
  public damagedDevice:string;
  public serialNumber:string;
  public structure:string;
  public status:string;
  public ticketCharge:number;
  public technicianResolution:string;
  public user:User;
  statuses = AppConstants.TRANSLATIONS.TICKET_STATUSES;
  statusEdit;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromTicket.FeatureState>,
    private ticketsService: TicketsService,
    private currentUserService: CurrentUserService) {
    this.user = this.currentUserService.currentUser
  }

  ngOnInit() {
    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['_id']; // (+) converts string 'id' to a number
          this.ticketsService.getTicket(this.id).subscribe(
            (ticket: any) => {
              this.ticket =  ticket;
              this.teacherName = ticket.teacherName;
              this.teacherId = ticket.teacherId;
              this.teachersContactPhone = ticket.teachersContactPhone;
              this.problemsNature = ticket.problemsNature;
              this.missingEquipments = ticket.missingEquipments;
              this.deviceLocation = ticket.deviceLocation;
              this.damagedDevice = ticket.damagedDevice;
              this.serialNumber = ticket.serialNumber;
              this.structure = ticket.structure;
              this.status = this.statusEdit = ticket.status;
              this.ticketCharge = ticket.ticketCharge;
              this.technicianResolution = ticket.technicianResolution;
              console.log(this.ticket)
            }
          )
        }
      );
  this.editTicketForm = new FormGroup({
    'ticketData' : new FormGroup({
      'teacherName' : new FormControl(null, []),
      'teacherId' : new FormControl(null, []),
      'teachersContactPhone' : new FormControl(null, []),
      'damagedDevice' : new FormControl(null, []),
      'serialNumber' : new FormControl(null, []),
      'structure' : new FormControl(null, []),
      'deviceLocation' : new FormControl(null, []),
      'problemsNature' : new FormControl(null, [Validators.required]),
      'missingEquipments' : new FormControl(null, []),
      'ticketCharge' : new FormControl(null, []),
      'technicianResolution' : new FormControl(null, []),
      'status' : new FormControl(null, []),
    }),
    // 'status': new FormControl('Stable')
  })
    const formFields = this.editTicketForm.controls.ticketData['controls'];
    if(this.user.userRole === 'technician' || this.user.userRole === 'super') {
      formFields.technicianResolution.enable();
      formFields.ticketCharge.enable()
    } else {
      formFields.technicianResolution.disable();
      formFields.ticketCharge.disable()
    }

    // this.params = this.route.params.subscribe(params => {
    //   this.subscription = this.ticketsService.getTicket(params._id).subscribe(
    //     (ticket: any) => {
    //       this.ticket =  ticket;
    //       console.log(this.ticket)
    //     }
    //   )
    // });
  }

  back() {
    this.router.navigate(['/tickets'], {relativeTo: this.route})
  }

  edit() {
    console.log(this.ticket);
    this.editMode = true;
    this.editTicketForm.patchValue({
      ticketData: {...this.ticket}
    })
  }
  onSubmit() {
    const ticketData = this.editTicketForm.value.ticketData;
    ticketData._id = this.ticket._id;
    if (this.editMode) {
      this.store.dispatch(new TicketActions.UpdateTicket({indexId: this.id, ticket: ticketData}));
    } else {
      // this.store.dispatch(new TicketActions.AddRecipe(this.recipeForm.value));
    }
    // debugger
    // this.store.dispatch(new TicketActions.SetTicket(new Ticket(
    //   new Date(),
    //   this.currentUserService.currentUser.fullName,
    //   ticketData.damagedDevice,
    //   ticketData.serialNumber,
    //   ticketData.structure,
    //   ticketData.deviceLocation,
    //   ticketData.problemsNature,
    //   ticketData.missingEquipments,
    //   this.currentUserService.currentUser.phoneNumber,
    //   ticketData.status,
    //   this.currentUserService.currentUser.id,
    //   ticketData.ticketCharge,
    //   ticketData.technicianResolution
    // )));
    // this.router.navigate(['/tickets'], {relativeTo: this.route});
    // console.log(this.editTicketForm)
    // this.toastr.success('הכרטיס נרשם בהצלחה','כרטיס חדש')
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe()
    // this.subscription.unsubscribe()
  }

}
