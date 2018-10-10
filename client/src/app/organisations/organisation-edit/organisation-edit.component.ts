import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromOrganisation from "../store/organisation.reducers";

import {CurrentUserService} from "../../shared/current-user.service";
import * as OrganisationsActions from "../store/organisation.actions";
import {Subscription} from "rxjs";
import {AppConstants} from "../../app.constants";
import {Organisation} from "../organisation.model";
import {OrganisationsService} from "../organisations.service";

@Component({
  selector: 'app-organisation-edit',
  templateUrl: './organisation-edit.component.html',
  styleUrls: ['./organisation-edit.component.css']
})
export class OrganisationEditComponent implements OnInit, OnDestroy {

  organisation: Organisation;
  organisationSubscription: Subscription;
  name:string;
  address:string;
  city:string;
  phone:string;
  status:boolean;
  type:string;
  public editOrganisationForm: FormGroup;
  editMode: boolean = false;
  user: User;
  types: string[];

  constructor(
    private organisationsService: OrganisationsService,
    private currentUserService: CurrentUserService,
    private router: Router,
    private store: Store<fromOrganisation.FeatureState>,
    private route: ActivatedRoute,
  ) { this.user = this.currentUserService.currentUser }

  ngOnInit() {
    // console.log('user: ',this.user)
    this.organisationSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.organisationsService.getOrganisation(params['_id']).subscribe(
            (organisation: Organisation) => {
              this.organisation = organisation;
              this.name = organisation.name;
              this.address = organisation.address;
              this.city = organisation.city;
              this.phone = organisation.phone;
              this.status = organisation.status;
              this.type = organisation.type;
              console.log(this.user);
            }
          )
        }
      );

    this.editOrganisationForm = new FormGroup({
      'orgData' : new FormGroup({
        'name' : new FormControl(null, [Validators.required]),//,this.allowedEmailsAsync),
        'address' : new FormControl(null, [Validators.required]),
        'city' : new FormControl(null, [Validators.required]),
        'phone' : new FormControl(null, [Validators.required]),
        'status' : new FormControl(null, []),
        'type' : new FormControl(null, )
      }),
      // 'status': new FormControl('Stable')
    });
  }
  back() {
    this.router.navigate(['/organisations'], {relativeTo: this.route})
  }

  edit() {
    console.log(this.user);
    this.editMode = true;
    this.editOrganisationForm.patchValue({
      orgData: {...this.organisation}
    });
    this.types = AppConstants.ORGANISATIONS.TYPES;
  }
  onSubmit() {
    const orgData = this.editOrganisationForm.value.orgData;
    orgData._id = this.organisation._id;
    if (this.editMode) {
      this.store.dispatch(new OrganisationsActions.UpdateOrganisation({index: +this.organisation._id, organisation: orgData}));
      this.editMode = false;
    } else {
      // this.store.dispatch(new TicketActions.AddRecipe(this.recipeForm.value));
    }
  }

  ngOnDestroy() {
    this.organisationSubscription.unsubscribe()
  }
}
