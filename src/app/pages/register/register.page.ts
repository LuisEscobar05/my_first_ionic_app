import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit{
  isDisabled = true;
  userValid=true;
  mailValid=true;
  passwordValid=true;
  samePassword=true;
  user = {} as User;
  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private loginService: LoginService,

  ) {}

  ngOnInit(){

  }

  validateUser(event: any){
    this.isDisabled=true;
    this.userValid=false;
    let newValue = event.target.value;
    console.log(newValue);

    let regExp = new RegExp('^[A-Za-z0-9]{8,30}$');

    if(regExp.test(newValue))
      this.userValid=true;
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

    if(regExp.test(newValue))
      this.passwordValid=true;
  }
  validateSamePassword(event: any){
    this.isDisabled=true;
    this.samePassword=false;
    let newValue = event.target.value;
    console.log(newValue);
    if(this.userValid && this.mailValid && this.passwordValid){
      if(this.user.password == this.user.repeatPassword){
        this.samePassword= true;
        this.isDisabled=false;
      }
    }
  }

  async onSubmit(_form: NgForm) {
    const loading = await this.loadingController.create();
    await loading.present();

    this.loginService.signUp(_form.value).then(
      (res) => {
        loading.dismiss();
        this.loginService.sendEmailToVerification();
        this.loginService.singOut();
        this.presentAlert('Se registro con exito,\n por favor verifique su email\npara poder iniciar sesion','Registro exitoso!');
        this.router.navigateByUrl('/', {replaceUrl: true});
      },
      async (err) => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'A ocurrido un eror!' ,
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
