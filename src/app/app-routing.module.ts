import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LKComponent } from './lk/lk.component';
import { QueueComponent } from './queue/queue.component';
import { StatisticComponent } from './statistic/statistic.component';
import { TripComponent } from './trip/trip.component';

const routes: Routes = [
  {
    path: 'lk',
    component: LKComponent
  },
  {
    path: 'auth/signin',
    component: LoginComponent
  },
  {
    path: 'auth/signup',
    component: RegisterComponent
  },
  {
    path: 'queue/f/v',
    component: QueueComponent
  },
  {
    path: 'queue/v/f',
    component: QueueComponent
  },
  {
    path: 'trips',
    component: TripComponent
  },
  {
    path: 'statistic',
    component: StatisticComponent
  },
  {
    path: '',
    redirectTo: 'queue/f/v',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
