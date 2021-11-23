import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner,BarcodeScannerOptions} from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.page.html',
  styleUrls: ['./barcode.page.scss'],
})
export class BarcodePage implements OnInit {
  data={
    url:'',
    name:'',
  }
  show=false;
  constructor(
    private alertController: AlertController,
    private barcodeScanner: BarcodeScanner,
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit() {

  }

  openScanner(){
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
      orientation: 'portrait',
    };
    this.barcodeScanner.scan(options).then(barcodeData => {
      const dataSplit = ''+barcodeData["text"];
      const myArray = dataSplit.split(',');
      this.data.url = myArray[0];
      this.data.name = myArray[1];
      this.show = true;
    }).catch(err => {
      this.presentAlert('Ah ocurrido algun error!',err);
    });
  }

  signOut(){
    this.loginService.singOut().then(()=>{
      this.router.navigateByUrl('/', {replaceUrl: true});
    });
  }

  async presentAlert(res,sub) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: sub,
      // subHeader:sub,
      message: res,
      buttons: ['OK']
    });
    await alert.present();
  }

}
