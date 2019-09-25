import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './no-auth/login/login.component';
import { RegistrationComponent } from './no-auth/registration/registration.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { AddEditEventComponent } from './components/dashboard/add-edit-event/add-edit-event.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-edit-event', component: AddEditEventComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
