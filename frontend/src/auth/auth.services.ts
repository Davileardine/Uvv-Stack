import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from "rxjs";

@Injectable()

export class AuthServices {
  private baseUrl: string = 'http://localhost:3000/auth';
  private http = inject(HttpClient);

  login(email: string, password: string): Observable<any> {
    const credentials = {email, password};

    return this.http.post<any>(`${this.baseUrl}/login`, credentials)
      .pipe(
        map(response => {
          const token = response.token;
          if (token) {
            this.setToken(token);
            return true;
          } else {
            console.log('error', response)
            return false;
          }
        })
      );
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, {name, email, password})
      .pipe(
        map(response => {
          if (response.token) {
            this.setToken(response.token);
            return true
          } else {
            console.log('error', response)
            return false;
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {

    return localStorage.getItem('token');
  }

  user(): any {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    const payload = token.split('.')[1];
    const decoded = window.atob(payload);
    return JSON.parse(decoded).user;
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token)
  }
}
