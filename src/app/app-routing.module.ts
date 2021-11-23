import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

// Send unauthorized users to login
const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/']);

// Automatically log in users
const redirectLoggedInToTabs = () => redirectLoggedInTo(['/tabs']);


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToTabs),
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToTabs),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule),
    ...canActivate(redirectLoggedInToTabs),
  },
  {
    path: 'password-reset',
    loadChildren: () => import('./pages/password-reset/password-reset.module').then( m => m.PasswordResetPageModule),
    ...canActivate(redirectLoggedInToTabs),
  },
  {
    path: 'barcode',
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('./pages/barcode/barcode.module').then( m => m.BarcodePageModule)
  },
  {
    path: 'update-user',
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('./pages/update-user/update-user.module').then( m => m.UpdateUserPageModule)
  },
  {
    path: 'notifications',
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'tabs',
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'carousel',
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('./pages/carousel/carousel.module').then( m => m.CarouselPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
