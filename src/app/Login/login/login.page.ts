import { Component, OnInit } from '@angular/core';
import { DTUser } from '../../models/user/dtuser';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: DTUser = new DTUser();

  constructor(
    private auth : AuthService
  ) { }

  ngOnInit() {
  }

  login() {    
    this.auth.login(this.user,1);
  }

}
