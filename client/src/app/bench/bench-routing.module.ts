import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BenchDetailsComponent } from './bench-details/bench-details.component';
import { BenchListComponent } from './bench-list/bench-list.component';


const routes: Routes = [
  {
    path: '',
    children: [
        {
            path: '',
            pathMatch: 'full',
            component: BenchListComponent
        },
        {
            path: 'details',
            component: BenchDetailsComponent
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BenchRoutingModule { }
