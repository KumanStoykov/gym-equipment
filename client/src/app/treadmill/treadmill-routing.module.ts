import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreadmillListComponent } from './treadmill-list/treadmill-list.component';
import { TreadmillDetailsComponent } from './treadmill-details/treadmill-details.component';


const routes: Routes = [
  {
    path: '',
    children: [
        {
            path: '',
            pathMatch: 'full',
            component: TreadmillListComponent
        },
        {
            path: ':id',
            component: TreadmillDetailsComponent
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreadmillRoutingModule { }
