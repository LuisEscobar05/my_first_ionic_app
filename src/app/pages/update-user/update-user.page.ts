import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage{
  isDisabled = true;
  nameValid=true;
  mailValid=true;
  lparentValid=true;
  lmotherValid=true;
  numberPhoneValid=true;
  user = {
    name: '',
    mail:'',
    lparent: '',
    lmother:'',
    numberPhone:'',
  };
  constructor() {}

  validateName(event: any){
    this.isDisabled=true;
    this.nameValid=false;
    let newValue = event.target.value;
    console.log(newValue);

    let regExp = new RegExp('^[A-Za-z ]{3,30}$');

    if(regExp.test(newValue))
      this.nameValid=true;
  }


  validateLastNameP(event: any){
    this.isDisabled=true;
    this.lparentValid=false;
    let newValue = event.target.value;
    console.log(newValue);

    let regExp = new RegExp('^[A-Za-z]{3,30}$')

    if(regExp.test(newValue))
      this.lparentValid=true;
  }

  validateLastNameM(event: any){
    this.isDisabled=true;
    this.lmotherValid=false;
    let newValue = event.target.value;
    console.log(newValue);
    let regExp = new RegExp('^[A-Za-z]{3,30}$')
    if(regExp.test(newValue))
    this.lmotherValid=true;
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
  validateNumberPhone(event:any){
    this.isDisabled=true;
    this.numberPhoneValid=false;
    let newValue = event.target.value;
    console.log(newValue);
    let regExp = new RegExp('^[0-9]{10,10}$');
    if(regExp.test(newValue)){
      this.numberPhoneValid=true;
      if(this.nameValid && this.lparentValid && this.lmotherValid && this.mailValid && this.numberPhoneValid){
        this.isDisabled=false;
      }
    }

  }
  async onSubmit(_form: NgForm) {
    console.log(this.user);

    alert(this.user.name + ' : '  + this.user.lparent +  ' : ' + this.user.lmother + ':'+  this.user.mail + ' : ' + this.user.numberPhone);
  }
}
