import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreadmillCatalogComponent } from './treadmill-catalog/treadmill-catalog.component';


const routes: Routes = [
  {
    path: '',
    children: [
        {
            path: '',
            pathMatch: 'full',
            component: TreadmillCatalogComponent
        },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreadmillRoutingModule { }
