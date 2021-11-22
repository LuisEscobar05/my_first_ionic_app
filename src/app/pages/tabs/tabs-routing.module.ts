import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

// Send unauthorized users to login
const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/']);

// // Automatically log in users
// const redirectLoggedInToTabs = () => redirectLoggedInTo(['/tabs']);


const routes: Routes = [
  {
    path:'',
    ...canActivate(redirectUnauthorizedToLogin),
    redirectTo:'carousel',
  },
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path:'carousel',
        ...canActivate(redirectUnauthorizedToLogin),
        loadChildren: () => import('../carousel/carousel.module').then(m => m.CarouselPageModule)
      },
      {
        path:'update-user',
        ...canActivate(redirectUnauthorizedToLogin),
        loadChildren: () => import('../update-user/update-user.module').then(m=>m.UpdateUserPageModule)
      },
      {
        path:'barcode',
        ...canActivate(redirectUnauthorizedToLogin),
        loadChildren: () => import('../barcode/barcode.module').then(m => m.BarcodePageModule)
      },
      {
        path:'notifications',
        ...canActivate(redirectUnauthorizedToLogin),
        loadChildren: () => import('../notifications/notifications.module').then(m => m.NotificationsPageModule)
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
