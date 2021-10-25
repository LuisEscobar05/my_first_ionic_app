import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage{
  isDisabled = true;
  userValid=true;
  mailValid=true;
  passwordValid=true;
  samePassword=true;
  user = {
    usario: '',
    mail:'',
    contrasena: '',
    repeatCon:'',
  };
  constructor() {}

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
    if(this.user.contrasena == this.user.repeatCon){
      this.samePassword= true;
      if(this.userValid && this.mailValid && this.passwordValid){
        this.isDisabled=false;
      }
    }
  }

  async onSubmit(_form: NgForm) {
    console.log(this.user);

    alert(this.user.usario + ' : ' + this.user.mail + ' : ' + this.user.contrasena + ' : ' + this.user.repeatCon );
  }
}
