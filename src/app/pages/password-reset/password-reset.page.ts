import { Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage{

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private loginService: LoginService,
  ) {}

  isDisabled = true;
  emailValid= true;
  email = '';

  validateEmail(event: any){
    this.isDisabled=true;
    this.emailValid=false;
    let newValue = event.target.value;
    console.log(newValue);

    let regExp = new RegExp('^[A-Za-z0-9._]+@[A-Za-z]+(\.[A-Za-z]+)(\.[A-Za-z]+)(\.[A-Za-z]+)$');

    if(regExp.test(newValue)){
      this.emailValid=true;
      this.isDisabled=false;
    }

  }

  async onSubmit(_form: NgForm) {
    const loading = await this.loadingController.create();
    await loading.present();
    this.loginService.sentResetPassword(this.email).then(
      (res)=>{
        loading.dismiss();
        this.presentAlert('Se ha enviado el email para restaurar su contraseña con exito!','Email enviado con exito');
      },
      async (err) => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'A ocurrido un eror!',
          message: err.message,
          buttons: ['OK'],
        });
        await alert.present();

      }
    );

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
