import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarouselPageRoutingModule } from './carousel-routing.module';

import { CarouselPage } from './carousel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarouselPageRoutingModule
  ],
  declarations: [CarouselPage]
})
export class CarouselPageModule {}
