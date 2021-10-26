import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarouselPageRoutingModule } from './carousel-routing.module';
import {MatButtonModule} from '@angular/material/button';

import { CarouselPage } from './carousel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarouselPageRoutingModule,
    MatButtonModule,
  ],
  declarations: [CarouselPage]
})
export class CarouselPageModule {}
