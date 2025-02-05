import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'contacts',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/contacts/contact-list/contact-list.module').then(m => m.ContactListPageModule)
      },
      {
        path: 'detail/:id',
        loadChildren: () => import('./pages/contacts/contact-detail/contact-detail.module').then(m => m.ContactDetailPageModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./pages/contacts/contact-edit/contact-edit.module').then(m => m.ContactEditPageModule)
      },
      {
        path: 'create',
        loadChildren: () => import('./pages/contacts/contact-edit/contact-edit.module').then(m => m.ContactEditPageModule)
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'person',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/person/person-list/person-list.module').then(m => m.PersonListPageModule)
      },
      {
        path: 'detail/:id',
        loadChildren: () => import('./pages/person/person-detail/person-detail.module').then(m => m.PersonDetailPageModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./pages/person/person-edit/person-edit.module').then(m => m.PersonEditPageModule)
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }