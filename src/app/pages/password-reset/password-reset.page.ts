import { Component} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage{

  constructor() {}

  isDisabled = true;
  mailValid= true;
  mail = '';

  validateEmail(event: any){
    this.isDisabled=true;
    this.mailValid=false;
    let newValue = event.target.value;
    console.log(newValue);
 
    let regExp = new RegExp('^[A-Za-z0-9._]+@[A-Za-z]+(\.[A-Za-z]+)(\.[A-Za-z]+)(\.[A-Za-z]+)$');
 
    if(regExp.test(newValue)){
      this.mailValid=true;
      this.isDisabled=false;
    }
    
  }

  async onSubmit(_form: NgForm) {
    alert(this.mail)
  }

}
