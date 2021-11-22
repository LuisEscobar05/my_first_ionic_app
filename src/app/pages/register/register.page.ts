import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
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
  user = {
    usuario: '',
    mail:'',
    contrasena: '',
    repeatCon:'',
  };
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
      if(this.user.contrasena == this.user.repeatCon){
        this.samePassword= true;
        this.isDisabled=false;
      }
    }
  }

  async onSubmit(_form: NgForm) {
    const loading = await this.loadingController.create();
    await loading.present();

    this.loginService.signUp(this.user.usuario,this.user.mail,this.user.contrasena ).then(
      (res) => {
        loading.dismiss();
        this.router.navigateByUrl('/tabs', {replaceUrl: true});
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


}
