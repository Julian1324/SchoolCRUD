import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { constants } from 'src/app/core/data/constants';
import { AuthDTO } from '../data/authDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<AuthDTO> {
    const body = { email, password };
    return this.http.post<AuthDTO>(environment.api + constants.LOGIN_URL, body);
  }
}
