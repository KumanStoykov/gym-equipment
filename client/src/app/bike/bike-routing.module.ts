import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BikeDetailsComponent } from './bike-details/bike-details.component';
import { BikeListComponent } from './bike-list/bike-list.component';


const routes: Routes = [
  {
    path: '',
    children: [
        {
            path: '',
            pathMatch: 'full',
            component: BikeListComponent
        },
        {
            path: 'details',
            component: BikeDetailsComponent
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BikeRoutingModule { }
