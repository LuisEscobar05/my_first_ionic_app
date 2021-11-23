import { Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private loginService: LoginService
  ) {}

  isDisabled = true;
  userValid=true;
  mailValid=true;
  passwordValid=true;
  user = {} as User;

  validateUser(event: any){
    this.isDisabled=true;
    this.userValid=false;
    let newValue = event.target.value;
    console.log(newValue);

    let regExp = new RegExp('^[A-Za-z0-9]{8,30}$');

    if(regExp.test(newValue)){
      this.userValid=true;
    }
  }

  validateMail(event: any){
    this.isDisabled=true;
    this.mailValid=false;
    let newValue = event.target.value;
    console.log(newValue);

    let regExp = new RegExp('^[A-Za-z0-9._]+@[A-Za-z]+(\.[A-Za-z]+)(\.[A-Za-z]+)(\.[A-Za-z]+)$');

    if(regExp.test(newValue))
      this.mailValid=true;

  }

  validatePassword(event: any){
    this.isDisabled=true;
    this.passwordValid=false;
    let newValue = event.target.value;
    console.log(newValue);

    let regExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,20}$');

    if(regExp.test(newValue)){
      this.passwordValid=true;
      if(this.mailValid==true&&this.passwordValid==true){
        this.isDisabled=false;
      }
    }
  }

  async onSubmit(_form: NgForm) {

    const loading = await this.loadingController.create();
    await loading.present();
    this.loginService.singIn(_form.value).then(
      (res) => {
        loading.dismiss();
        if(this.loginService.userVerifiedMail()){
          this.router.navigateByUrl('/tabs', {replaceUrl: true});
        }else{
          this.loginService.sendEmailToVerification();
          this.loginService.singOut();
          this.presentAlert('Ups! parece que aun no ha confirmado su email\nse ha enviado un mensaje de confirmación al email proporcionado','Verificación de Email');
        }
      },
      async (err) => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Alguno de sus datos son incorrectos' ,
          message: err.message,
          buttons: ['OK'],
        });
        await alert.present();

      }
    )

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
