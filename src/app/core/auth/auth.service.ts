import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {UserService} from '../user/user.service';
import {environment} from '../../../environments/environment';

const API = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private userService: UserService) {
  }

  authenticated(userName: string, password: string) {
    return this.http
      .post(API + '/user/login', {userName: userName, password: password}, {observe: 'response'})
      .pipe(tap(res => {
        const authToken = res.headers.get('x-access-token');
        this.userService.setToken(authToken);
        console.log(`User ${userName} autenticated with token ${authToken}`);
      }));
  }
}
