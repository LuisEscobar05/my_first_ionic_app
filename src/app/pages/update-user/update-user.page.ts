import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/user'
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage implements OnInit {
  isDisabled = true;
  nameValid = true;
  usernameValid = true;
  ap_pat_valid = true;
  ap_mat_valid = true;
  numberPhoneValid = true;
  user = {} as User;
  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit() {
    const idUserLogged = this.loginService.getUserLogged();
    this.loginService.getUserById(idUserLogged).subscribe(res => {
      this.user = res;
    })
  }
  validateName(event: any) {
    this.isDisabled = true;
    this.nameValid = false;
    let newValue = event.target.value;
    console.log(newValue);

    let regExp = new RegExp('^[A-Za-z ]{3,30}$');

    if (regExp.test(newValue)) {
      this.nameValid = true;
      this.validateDisabledButton();
    }
  }


  validateLastNameP(event: any) {
    this.isDisabled = true;
    this.ap_pat_valid = false;
    let newValue = event.target.value;
    console.log(newValue);

    let regExp = new RegExp('^[A-Za-z]{3,30}$')

    if (regExp.test(newValue)) {
      this.ap_pat_valid = true;
      this.validateDisabledButton();
    }
  }

  validateLastNameM(event: any) {
    this.isDisabled = true;
    this.ap_mat_valid = false;
    let newValue = event.target.value;
    console.log(newValue);
    let regExp = new RegExp('^[A-Za-z]{3,30}$')
    if (regExp.test(newValue)) {
      this.ap_mat_valid = true;
      this.validateDisabledButton();
    }
  }

  validateUsername(event: any) {
    this.isDisabled = true;
    this.usernameValid = false;
    let newValue = event.target.value;
    console.log(newValue);

    let regExp = new RegExp('^[A-Za-z0-9]{8,30}$');

    if (regExp.test(newValue)) {
      this.usernameValid = true;
      this.validateDisabledButton();
    }
  }

  validateNumberPhone(event: any) {
    this.isDisabled = true;
    this.numberPhoneValid = false;
    let newValue = event.target.value;
    console.log(newValue);
    let regExp = new RegExp('^[0-9]{10,10}$');
    if (regExp.test(newValue)) {
      this.numberPhoneValid = true;
      this.validateDisabledButton();
    }

  }
  async onSubmit(_form: NgForm) {
    const idUserLogged = this.loginService.getUserLogged();
    const loading = await this.loadingController.create();
    await loading.present();
    this.loginService.update(_form.value, idUserLogged).then(
      (res) => {
        loading.dismiss();
        this.presentAlert('Usuario actualizado con exito!','Información actualizada');
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
    )
  }
  validateDisabledButton() {
    if (this.nameValid && this.ap_pat_valid && this.ap_mat_valid && this.usernameValid && this.numberPhoneValid) {
      this.isDisabled = false;
    }
  }
  signOut() {
    this.loginService.singOut();
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
