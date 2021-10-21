import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/_guards/auth.guard';

import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'training', loadChildren: () => import('./training/training.module').then(m => m.TrainingModule), canLoad: [AuthGuard] }, // lazy loading bc we dont need it when the app starts
  { path: '**', component: WelcomeComponent },                                                                                      // will only lazy load training module if auth guard is passed.
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
