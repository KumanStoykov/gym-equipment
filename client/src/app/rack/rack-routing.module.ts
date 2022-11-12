import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RackDetailsComponent } from './rack-details/rack-details.component';
import { RackListComponent } from './rack-list/rack-list.component';


const routes: Routes = [
  {
    path: 'rack',
    children: [
        {
            path: '',
            pathMatch: 'full',
            component: RackListComponent
        },
        {
            path: 'details',
            component: RackDetailsComponent
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RackRoutingModule { }
