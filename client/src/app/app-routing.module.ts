import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { TermsAndConditionsComponent } from './core/terms-and-conditions/terms-and-conditions.component';
import { AdminGuard } from './shared/guards/admin.guard';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
    },
    {
        path: 'promotion',
        loadChildren: () => import('./promotion/promotion.module').then(m => m.PromotionModule)
    },
    {
        path: 'treadmill',
        loadChildren: () => import('./treadmill/treadmill.module').then(m => m.TreadmillModule)
    },
    {
        path: 'bike',
        loadChildren: () => import('./bike/bike.module').then(m => m.BikeModule)
    },
    {
        path: 'strength',
        loadChildren: () => import('./rack/rack.module').then(m => m.RackModule)
    },
    {
        path: 'strength',
        loadChildren: () => import('./bench/bench.module').then(m => m.BenchModule)
    },
    {
        path: 'strength',
        loadChildren: () => import('./dumbbell/dumbbell.module').then(m => m.DumbbellModule)
    },
    {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    },
    {
        path: 'admin',
        canActivate: [AdminGuard],
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'terms-and-conditions',
        component: TermsAndConditionsComponent
    },
    {
        path: '**',
        redirectTo: '/'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules,
        scrollPositionRestoration: 'enabled'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
