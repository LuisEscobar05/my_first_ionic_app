import { Component} from '@angular/core';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  constructor() {}

  isDisabled = true;
  userValid=true;
  passwordValid=true;
  user = {
    usario: '',
    contrasena: ''
  }

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

  validatePassword(event: any){
    this.isDisabled=true;
    this.passwordValid=false;
    let newValue = event.target.value;
    console.log(newValue);
 
    let regExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,20}$');
 
    if(regExp.test(newValue)){
      this.passwordValid=true;
      if(this.userValid==true&&this.passwordValid==true){
        this.isDisabled=false;
      }
    }
  }

  async onSubmit(_form: NgForm) {
    console.log(this.user);
 
    alert(this.user.usario + ' : ' + this.user.contrasena)
  }

}
