import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AccountSettingsComponent } from './auth/account-settings/account-settings.component';
import { RegisterComponent } from './auth/register/register.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './home/home.component';
import { ManagePrivacyComponent } from './manage-privacy/manage-privacy.component';
import { PrivacyStatementComponent } from './privacy-statement/privacy-statement.component';
import { AnonGuard } from './_guards/anon.guard';
import { AuthGuard } from './_guards/auth.guard';
import { NotFoundComponent } from './_sharedcomponents/not-found/not-found.component';
import { ServerErrorComponent } from './_sharedcomponents/server-error/server-error.component';
import { TestErrorsComponent } from './_sharedcomponents/test-errors/test-errors.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'blog', component: BlogComponent },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [AnonGuard],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AnonGuard],
    runGuardsAndResolvers: 'always',
  },
  { path: 'test-errors', component: TestErrorsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'privacy-statement', component: PrivacyStatementComponent },
  { path: 'manage-privacy', component: ManagePrivacyComponent },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
  },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'legacy',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
