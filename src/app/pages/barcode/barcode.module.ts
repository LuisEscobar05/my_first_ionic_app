import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarcodePageRoutingModule } from './barcode-routing.module';
import {MatButtonModule} from '@angular/material/button';

import { BarcodePage } from './barcode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarcodePageRoutingModule,
    MatButtonModule,
  ],
  declarations: [BarcodePage]
})
export class BarcodePageModule {}
