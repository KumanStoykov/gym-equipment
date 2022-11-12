import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenchListComponent } from './bench-list/bench-list.component';
import { BenchInfoComponent } from './bench-info/bench-info.component';
import { BenchDetailsComponent } from './bench-details/bench-details.component';
import { SharedModule } from '../shared/shared.module';
import { BenchRoutingModule } from './bench-routing.module';



@NgModule({
  declarations: [
    BenchListComponent,
    BenchInfoComponent,
    BenchDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BenchRoutingModule
  ]
})
export class BenchModule { }
