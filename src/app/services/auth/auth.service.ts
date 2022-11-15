import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take, Observable } from 'rxjs';
import { IAuthRes } from 'src/app/types/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url: string = environment.url
  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  public authUser({ email, password}: {email: string, password: string}): Observable<IAuthRes> {
    return this.httpClient.post<IAuthRes>(`${this.url}/auth`, {
      email,
      password
    })
  }

  public authRoutine (token: string) {
    this._setToken(token);
  }

  public loggedIn() {
    return !!localStorage.getItem('@Auth:Token');
  }

  private _setToken(token: string) {
    localStorage.setItem('@Auth:Token', token);
  }
}
