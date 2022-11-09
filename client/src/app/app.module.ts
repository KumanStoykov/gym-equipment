import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { BenchModule } from './bench/bench.module';
import { BikeModule } from './bike/bike.module';
import { CoreModule } from './core/core.module';
import { DumbbellModule } from './dumbbell/dumbbell.module';
import { RackModule } from './rack/rack.module';
import { SharedModule } from './shared/shared.module';
import { TreadmillModule } from './treadmill/treadmill.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
