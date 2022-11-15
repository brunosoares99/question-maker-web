import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url: string = environment.url
  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  createUser({ name, email, password }: { name: string, email: string, password: string }) {
    return this.httpClient.post(`${this.url}/users`, {
      name,
      email,
      password
    });
  }
}
