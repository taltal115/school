import {NgModule} from '@angular/core';
import {DropdownDirective} from './dropdown.directive';
import {CommonModule} from '@angular/common';
import {FilterPipe} from "./pipes/filter.pipe";
import {TableFilter} from "./pipes/table-filter.pipe";

@NgModule({
  declarations: [
    DropdownDirective,
    FilterPipe,
    TableFilter
  ],
  exports: [
    CommonModule,
    DropdownDirective,
    FilterPipe,
    TableFilter
  ]
})
export class SharedModules {

}
