import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path:'',
    redirectTo:'carousel',
  },
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path:'carousel',
        loadChildren: () => import('../carousel/carousel.module').then(m => m.CarouselPageModule)
      },
      {
        path:'update-user',
        loadChildren: () => import('../update-user/update-user.module').then(m=>m.UpdateUserPageModule)
      },
      {
        path:'barcode',
        loadChildren: () => import('../barcode/barcode.module').then(m => m.BarcodePageModule)
      },
      {
        path:'notifications',
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
