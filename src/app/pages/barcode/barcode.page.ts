import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.page.html',
  styleUrls: ['./barcode.page.scss'],
})
export class BarcodePage implements OnInit {

  constructor(
    private barcodeScanner: BarcodeScanner,
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit() {

  }

  openScanner(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
    }).catch(err => {
      console.log('Error', err);
    });
  }

  signOut(){
    this.loginService.singOut().then(()=>{
      this.router.navigateByUrl('/', {replaceUrl: true});
    });
  }

}
