import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  signOut(){
    this.loginService.singOut();
  }

}
