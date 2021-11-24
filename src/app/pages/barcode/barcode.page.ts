import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner,BarcodeScannerOptions} from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { PassdataService } from 'src/app/services/passdata.service';


@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.page.html',
  styleUrls: ['./barcode.page.scss'],
})
export class BarcodePage implements OnInit {

  dataQr={
    url:'',
    name:'',
  }
  
  show=false;
  constructor(
    private alertController: AlertController,
    private barcodeScanner: BarcodeScanner,
    private loginService: LoginService,
    private passdata : PassdataService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.passdata.disparadorData.subscribe( data =>{
      this.show = true;
      this.dataQr.url = data.url;
      this.dataQr.name = data.name;
    })
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
      this.dataQr.url = myArray[0];
      this.dataQr.name = myArray[1];
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
