import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';

import { Credentials } from 'src/app/domains/credentials';
import { JwtToken } from 'src/app/domains/jwt-token';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  @LocalStorage('authorization')  
  private _token: string;

  constructor(private http: HttpClient, private storage: LocalStorageService) { }

  get token() {
    return this._token;
  }

  login(credentials: Credentials): Observable<JwtToken> {
    return this.http.post<JwtToken>(`http://${environment.wetalkServer}/auth/login`,credentials)
      .pipe(tap((response: JwtToken) => this._token = `${response.tokenPrefix} ${response.accessToken}`));
  }

  logout() {
    this.storage.clear('authorization');
  }

  whoAmI(): string {
    let base64Token: string = this.token
      .split('.')[1]
      .replace('-', '+')
      .replace('_', '/');
    return JSON.parse(window.atob(base64Token)).sub;
  }

  validateToken(): Observable<String> {
    let headers: HttpHeaders = new HttpHeaders({ 'Authorization': this.token });
    return this.http.get<String>(`http://${environment.wetalkServer}/auth/me`, { headers: headers });
  }

}