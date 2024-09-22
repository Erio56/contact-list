import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

type TokenResponse = {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endpointUrl = 'http://localhost:4000/user'

  constructor(private router: Router, private http: HttpClient) { }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  login(username: string, password: string) {
    const corsHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.post<TokenResponse>(`${this.endpointUrl}/authenticate`, {username: username, password: password}, { headers: corsHeaders } )
  }

  createAccount(username: string, password: string){
    return this.http.post<TokenResponse>(this.endpointUrl, {username: username, password: password});
  }
}
