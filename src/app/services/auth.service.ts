import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthToken } from '../domain/auth.token';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { environment } from './../../environments/environment';



@Injectable()
export class AuthService {

  constructor(
        private _http: HttpClient, private _cookie: CookieService) {
    }

    private getAuth(): string {
        return this._cookie.get("auth");
    }

    private getRefresh(): string {
        return this._cookie.get("refresh");
    }

    private setAuth(a: AuthToken): void {
        this._cookie.set("auth", a.access_token, new Date(new Date().getTime() + a.expires_in * 1000));
        this._cookie.set("refresh", a.refresh_token);
    }

    public authenticated: BehaviorSubject<boolean> = new BehaviorSubject(this._cookie.check("auth"));

    public login(username: string, password: string): Observable<string> {
        let params:string="username="+username+"&password="+password+"&grant_type=password";
        let headers = new HttpHeaders()
            .set('Content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Basic ' + btoa(environment.oauthClientId + ":" + environment.oauthClientSecret));
        return this._http.post<AuthToken>(environment.rootPath + environment.oauthTokenPath, params.toString(), { headers: headers })
            .map(re => {
                this.setAuth(re);
                this.authenticated.next(true);
                return re.access_token;
            }).catch(this.handleError);
    }

  private handleError(error: Response) {
        return Observable.throw(error.json()['error'] || 'Login error');
    }

  private refreshAccessToken(): Observable<string> {  
        if (!this.getRefresh()) {
            return;
        }
        let params:string = "refresh_token="+this.getRefresh()+"&grant_type=refresh_token";
        let headers = new HttpHeaders()
            .set('Content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Basic ' + btoa(environment.oauthClientId + ":" + environment.oauthClientSecret));
        return this._http.post<AuthToken>(environment.rootPath + environment.oauthTokenPath, params, { headers: headers })
            .map(re => {
                this.setAuth(re);
                this.authenticated.next(true);
                return re.access_token;
            });
    }
          
  public logout(): void {
        this._cookie.delete("auth");
        this._cookie.delete("refresh");
        this.authenticated.next(false);
    } 
      
  public checkCredentials(): Observable<string> {
        if (this.getAuth()) {
            return Observable.of(this.getAuth());
        } else {
            if (this.getRefresh()) {
                return this.refreshAccessToken();
            } else {
                return Observable.of(null);
            }
        }
    }
      
    
}
