import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { User } from './../../domain/user';
import { RestService } from './../../services/rest.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  constructor(private authSvc: AuthService, private rest: RestService) { }

  ngOnInit() {
  }

  private user:User=new User();

  login(): void {
        this.authSvc.login(this.user.username, this.user.password)
        .subscribe(token => this.rest.getOne<User>("api/user/me", true)
          .subscribe(u => this.user = u));
    }

  logout(): void {
          this.user=new User();
          this.authSvc.logout();
    }
        

}
