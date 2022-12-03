import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DumbbellDetailsComponent } from './dumbbell-details/dumbbell-details.component';
import { DumbbellListComponent } from './dumbbell-list/dumbbell-list.component';


const routes: Routes = [
  {
    path: 'dumbbell',
    children: [
        {
            path: '',
            pathMatch: 'full',
            component: DumbbellListComponent
        },
        {
            path: ':id',
            component: DumbbellDetailsComponent
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DumbbellRoutingModule { }
