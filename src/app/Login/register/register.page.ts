import { Component, OnInit } from '@angular/core';
import { RestService } from '../../Services/rest.service';
import { DTnewuser } from '../../models/models';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DTUser } from 'src/app/models/user/dtuser';
import { UserService } from 'src/app/Services/user/user.service';
import { AuthService } from 'src/app/Services/auth/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  user : DTUser = new DTUser();

  constructor(
    public rest: RestService,
    public navctrl: NavController,
    public storage: Storage,
    private userAPI : UserService,
    private auth : AuthService
  ) { }

  public register(){
    this.userAPI.register(this.user).subscribe(
      data => {
        console.log(data);
        let u : DTUser = data;
        this.auth.login(u,2);
      }
    );
  }

}
