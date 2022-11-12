import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DumbbellInfoComponent } from './dumbbell-info/dumbbell-info.component';
import { DumbbellListComponent } from './dumbbell-list/dumbbell-list.component';
import { DumbbellDetailsComponent } from './dumbbell-details/dumbbell-details.component';
import { SharedModule } from '../shared/shared.module';
import { DumbbellRoutingModule } from './dumbbell-routing.module';



@NgModule({
  declarations: [
    DumbbellInfoComponent,
    DumbbellListComponent,
    DumbbellDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DumbbellRoutingModule
  ]
})
export class DumbbellModule { }
