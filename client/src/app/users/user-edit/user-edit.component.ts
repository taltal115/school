import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromTicket from "../../tickets/store/ticket.reducers";
import {TicketsService} from "../../tickets/tickets.service";
import * as fromUser from "../store/users.reducers";

import {CurrentUserService} from "../../shared/current-user.service";
import * as UsersActions from "../../users/store/users.actions";
import {UsersService} from "../users.service";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";
import {AppConstants} from "../../app.constants";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {

  user: User;
  userSubscription: Subscription;
  fullName:string;
  email:string;
  phoneNumber:string;
  status:string;
  orgId:string;
  userRole:string;
  public editUserForm: FormGroup;
  editMode: boolean = false;
  roles: string[];
  statuses: boolean[] = [true, false];

  constructor(
    private userService:UsersService,
    private router: Router,
    private store: Store<fromUser.FeatureState>,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // console.log('user: ',this.user)
    this.userSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.userService.getUser(params['_id']).subscribe(
            (user: User) => {
              this.user = user;
              this.fullName = user.fullName;
              this.email = user.email;
              this.phoneNumber = user.phoneNumber;
              this.status = user['status'];
              this.orgId = user.orgId;
              this.userRole = user.userRole;
              console.log(this.user);
              if(this.user.userRole === 'super') {
                this.roles = AppConstants.USER_ROLES.SUPER_ROLES;
              } else if(this.user.userRole === 'admin') {
                this.roles = AppConstants.USER_ROLES.ADMIN_ROLES;
              }
            }
          )
        }
      );

    this.editUserForm = new FormGroup({
      'userData' : new FormGroup({
        'fullName' : new FormControl(null, []),
        'email' : new FormControl(null, []),
        'phoneNumber' : new FormControl(null, []),
        'status' : new FormControl(null, []),
        'orgId' : new FormControl(null, []),
        'userRole' : new FormControl(null, []),
      }),
      // 'status': new FormControl('Stable')
    })
  }
  back() {
    this.router.navigate(['/users'], {relativeTo: this.route})
  }
  //
  // constructor(
  //   private router: Router,
  //   private route: ActivatedRoute,
  //   private store: Store<fromTicket.FeatureState>,
  //   private ticketsService: TicketsService,
  //   private currentUserService: CurrentUserService) {
  //   this.user = this.currentUserService.currentUser
  // }
  //
  // ngOnInit() {
  //   this.editTicketForm = new FormGroup({
  //     'ticketData' : new FormGroup({
  //       'damagedDevice' : new FormControl(null, []),
  //       'serialNumber' : new FormControl(null, []),
  //       'structure' : new FormControl(null, []),
  //       'deviceLocation' : new FormControl(null, []),
  //       'problemsNature' : new FormControl(null, [Validators.required]),
  //       'missingEquipments' : new FormControl(null, []),
  //       'ticketCharge' : new FormControl(null, []),
  //       'technicianResolution' : new FormControl(null, []),
  //     }),
  //     // 'status': new FormControl('Stable')
  //   })
  //   const formFields = this.editTicketForm.controls.ticketData.controls;
  //   if(this.user.userRole === 'technician' || this.user.userRole === 'super') {
  //     formFields.technicianResolution.enable();
  //     formFields.ticketCharge.enable()
  //   } else {
  //     formFields.technicianResolution.disable();
  //     formFields.ticketCharge.disable()
  //   }
  //
  //   // this.params = this.route.params.subscribe(params => {
  //   //   this.subscription = this.ticketsService.getTicket(params._id).subscribe(
  //   //     (ticket: any) => {
  //   //       this.ticket =  ticket;
  //   //       console.log(this.ticket)
  //   //     }
  //   //   )
  //   // });
  // }
  //
  edit() {
    console.log(this.user);
    this.editMode = true;
    this.editUserForm.patchValue({
      userData: {...this.user}
    })
  }
  onSubmit() {
    const userData = this.editUserForm.value.userData;
    userData._id = this.user._id;
    if (this.editMode) {
      this.store.dispatch(new UsersActions.UpdateUser({index: +this.user._id, user: userData}));
      this.editMode = false;
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
    this.userSubscription.unsubscribe()
    // this.subscription.unsubscribe()
  }

}
